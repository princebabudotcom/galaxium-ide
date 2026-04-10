export function Preview({ code }) {
  return (
    <iframe
      title="preview"
      className="w-full h-full bg-white"
      sandbox="allow-scripts"
      srcDoc={code}
    />
  );
}
