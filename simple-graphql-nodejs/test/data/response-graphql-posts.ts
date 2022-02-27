import { join } from 'path';
import { readFileSync } from 'fs';

const responseBodyIds = JSON.parse(readFileSync(join(__dirname, "./responses/all-ids.json"), 'utf8'));

const responseBodyFilteredBodyIds = JSON.parse(readFileSync(join(__dirname, "./responses/filtered-ids.json"), 'utf8'));

const responseBodyWithAllFields = JSON.parse(readFileSync(join(__dirname, "./responses/all-field.json"), 'utf8'));

const responseBodyFilteredWithAllFields = JSON.parse(readFileSync(join(__dirname, "./responses/all-field-filtered.json"), 'utf8'));

export const responses = {
  responseBodyIds,
  responseBodyFilteredBodyIds,
  responseBodyWithAllFields,
  responseBodyFilteredWithAllFields,
}