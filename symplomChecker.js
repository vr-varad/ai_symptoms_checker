const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')
dotenv.config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.api_key);

async function run(data) {
  console.log(data)
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = `
  Given the following information about an individual, provide 1)what could be reason? 2)general health and wellness advice along with 3) 5-point natural remedy plan. Please refrain from attempting to predict specific diseases.
  
  1. Age: ${data.age}
2. Gender: ${data.gender}
3. Occupation: ${data.occupation}
4. Nationality: ${data.nationality}
5. Weight: ${data.weight}
6. Health Insurance: ${data.health_insurance}
7. Existing Medical Symptoms: ${data.existing_medical_symptoms}
8. Chronic Disease: ${data.chronic_diseases}
9. Allergies: ${data.allergies}
10. Previous Surgeries: ${data.previous_surgeries}
11. Correct Medication: ${data.current_medications}
12. Smoking Status: ${data.smoking_status}
13. Alcohol Intake: ${data.alcohol_intake}
14. Occasional Drug Use: ${data.occasional_drug_use}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text)
  return text;
}

module.exports = run