export const stripHtmlTags = (html: string): string => {
  const temporalDivElement = document.createElement("div");
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || "";
};
