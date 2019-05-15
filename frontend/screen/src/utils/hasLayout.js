export const hasLayuot = (place, layout) => {
  const layouts = place.placeCategory.layoutItems
  return layouts.indexOf(layout) !== -1
}