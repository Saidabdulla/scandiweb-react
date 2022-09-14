export function sortProductAttrs(prod, isStart) {
  const colorAttr = prod.attributes.find((item) => {
    return item.name.toLowerCase() === "color" ? item : null;
  });

  if (!colorAttr) {
    return prod;
  }

  const filteredArray = prod.attributes.filter((item) => {
    return item.name.toLowerCase() !== "color" ? item : null;
  });

  if (filteredArray.length === 0) {
    return prod;
  }

  isStart ? filteredArray.push(colorAttr) : filteredArray.unshift(colorAttr);

  return {
    ...prod,
    attributes: filteredArray,
  };
}
