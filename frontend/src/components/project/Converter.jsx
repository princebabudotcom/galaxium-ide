export function convertToSandpack(files, basePath = "") {
  let result = {};

  files.forEach((file) => {
    const currentPath = `${basePath}/${file.name}`;

    if (file.type === "file") {
      result[currentPath] = file.content;
    }

    if (file.type === "folder") {
      Object.assign(result, convertToSandpack(file.children, currentPath));
    }
  });

  return result;
}
