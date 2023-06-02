const brands = {
  "Brands": {
    "Acqua": { "eventType": "AcquaEventType", "brandNameToBeDisplayed": "Acqua" }
  }
}

window.getBrands = function() {
  return brands.Brands;
}

export default brands;