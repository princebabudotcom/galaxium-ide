import { Container } from 'winston';
import logger from '../../logger/winston.logger.js';
import agentService from '../../services/agent.service.js';
import { frontendSystemPrompt, plannerPrompt } from '../../services/prompts/prompt.js';
import ApiError from '../../utils/ApiError.js';
import { parseLLMResponse } from '../../utils/jsonFormat.js';

const generatePlanning = async ({ payload, state }) => {
  try {
    const { messages, model } = state;

    // 1. Add system prompt ONLY once
    if (messages.length === 0) {
      messages.push({
        role: 'system',
        content: plannerPrompt('', payload.command),
      });
    }

    // 2. Add user message (RAW)
    messages.push({
      role: 'user',
      content: payload.content,
    });

    // 3. Call LLM
    const response = await agentService.generatePlanning({
      model,
      messages,
    });

    // 4. Store assistant response
    messages.push({
      role: 'assistant',
      content: response,
    });

    // console.log(response);
    // 5. RETURN instead of emit
    return {
      success: true,
      data: response,
      messages,
    };
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      error: 'Failed to generate response',
    };
  }
};

const generateFrontend = async ({ prompt }) => {
  try {
    const parsedPlan = parseLLMResponse(prompt);

    if (!parsedPlan) {
      return { success: false, error: 'Invalid plan JSON' };
    }

    const frontendMessages = [
      {
        role: 'system',
        content: frontendSystemPrompt,
      },
      {
        role: 'user',
        content: JSON.stringify(parsedPlan),
      },
    ];

    const response = await agentService.generateFrontend(frontendMessages);

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      error: 'Frontend generation failed',
    };
  }
};

const generateResponse = async ({ socket, payload, state }) => {
  try {
    const plan = await generatePlanning({ payload, state });

    // console.log(plan.data);

    if (!plan.success) {
      return socket.emit('ai-error', plan.error);
    }

    if (payload.command === 'frontend') {
      const response = await generateFrontend({
        prompt: plan.data,
      });

      if (!response.success) {
        return socket.emit('ai-error', response.error);
      }

      socket.emit('ai-response', response.data);
    } else {
      socket.emit('ai-response', plan.data);
    }
  } catch (error) {
    logger.error(error);
    socket.emit('ai-error', 'Something went wrong');
  }
};

export default {
  generatePlanning,
  generateResponse,
  generateFrontend,
};
