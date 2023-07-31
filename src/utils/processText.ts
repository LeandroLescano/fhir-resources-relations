import {FHIR_RESOURCES} from "src/assets/json-fhir";

export function extractReferenceObjects(localText: string) {
  const referencePattern =
    /"(\w+)"\s*:\s*\{[^\}]*Reference\([^\)]+\)[^\}]*\}|"(\w+)"\s*:\s*\[\s*{[^\]]*Reference\([^\)]+\)[^\]]*\s*}\s*\]/g;
  const resourceTypePattern = /"resourceType"\s*:\s*"(\w+)"/;

  let references: {[key: string]: string | string[]} = {};
  const resourceTypeMatch = localText.match(resourceTypePattern);
  const resourceType = resourceTypeMatch ? resourceTypeMatch[1] : null;

  const referenceMatches = localText.matchAll(referencePattern);
  for (const match of referenceMatches) {
    const propertyName = (match[1] || match[2]) as string;
    const value = match[0].match(
      /\{[^\}]*Reference\([^\)]+\)[^\}]*\}|\[[^\]]*Reference\([^\)]+\)[^\]]*\]/
    )?.[0];
    if (value) {
      references[propertyName] = value;
    }
  }

  for (const prop of Object.entries(references)) {
    const nameProp = prop[0];
    const matches = (prop[1] as string).match(
      /(?<=Reference\()([\S\s]*)(?=\))/
    ); //This will always be a single string
    if (matches) {
      const newValue = matches[0].split("|");
      references[nameProp] = newValue.map(
        (nv) => nv.replace(/\n {0,}/g, "").split(")")[0]
      );
    }
  }

  return {
    resourceType,
    ...references,
  };
}

export const getFHIRResources = () => {
  const matches = FHIR_RESOURCES.split(/(?="resourceType")/g);
  const newArr = [];
  for (const obj of matches) {
    const result = extractReferenceObjects(obj);
    if (result["resourceType"]) {
      newArr.push(result);
    }
  }
  return newArr;
};
