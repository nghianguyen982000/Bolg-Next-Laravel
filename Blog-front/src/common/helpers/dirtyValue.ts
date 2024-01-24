// import type { FieldNamesMarkedBoolean, FieldValues } from 'react-hook-form'

// // Map RHF's dirtyFields over the `data` received by `handleSubmit` and return the changed subset of that data.
// export function dirtyValues(dirtyFields: any, allValues: any): any {
//   // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
//   // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
//   if (dirtyFields === true || Array.isArray(dirtyFields)) return allValues
//   // Here, we have an object
//   return Object.fromEntries(
//     Object.keys(dirtyFields).map((key) => [
//       key,
//       dirtyValues(dirtyFields[key], allValues[key]),
//     ]),
//   )
// }

// export function dirtyValuesCustom<
//   TFieldValues extends FieldValues = FieldValues,
// >(
//   dirtyFields: FieldNamesMarkedBoolean<TFieldValues>,
//   allValues: TFieldValues,
// ): TFieldValues {
//   // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
//   // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
//   if (dirtyFields === true) return allValues
//   // Here, we have an object
//   return Object.fromEntries(
//     Object.keys(dirtyFields).map((key) => {
//       return [key, dirtyValuesCustom(dirtyFields[key], allValues[key])]
//     }),
//   )
// }
