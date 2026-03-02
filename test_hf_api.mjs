
import fetch from 'node-fetch';
import fs from 'fs';

const token = process.env.HUGGINGFACE_API_TOKEN || "YOUR_HF_TOKEN_HERE";
const models = [
  "Falconsai/alzheimer_prediction",
  "shadowlion/Alzheimer-Prediction",
  "BahaaEldin0/alzheimer-mri-classification",
];

async function testModel(modelId) {
  const urls = [
    `https://router.huggingface.co/hf-inference/models/${modelId}`,
    `https://router.huggingface.co/hf-inference/${modelId}`,
    `https://api-inference.huggingface.co/models/${modelId}`
  ];

  for (const url of urls) {
    console.log(`Testing URL: ${url}...`);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({inputs: "test"}),
      });
      console.log(`Status: ${response.status}`);
      const data = await response.json();
      console.log(`Response: ${JSON.stringify(data).substring(0, 100)}`);
      if (response.ok) return; // Stop if one works
    } catch (err) {
      console.error(`Error:`, err.message);
    }
  }
}

async function checkToken() {
  console.log('Checking token validity...');
  try {
    const response = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log(`Whoami Status: ${response.status}`);
    const data = await response.json();
    console.log(`Whoami Response: ${JSON.stringify(data)}`);
  } catch (err) {
    console.error('Whoami Error:', err.message);
  }
}

import FormData from 'form-data';

async function testCustomSpace() {
  const spaceUrl = "https://erick6655-perdix.hf.space/diagnose";
  console.log(`Testing Custom Space (FormData): ${spaceUrl}...`);
  try {
    const form = new FormData();
    form.append('mri_scan', Buffer.from('fake-image-data'), { filename: 'test.png' });
    form.append('age', '65');
    form.append('mmse_score', '25');

    const response = await fetch(spaceUrl, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });
    console.log(`Space Status: ${response.status}`);
    const text = await response.text();
    console.log(`Space Response Preview: ${text.substring(0, 200)}`);
  } catch (err) {
    console.error(`Space Error:`, err.message);
  }
}

async function run() {
  await testCustomSpace();
  console.log('---');
  await checkToken();
  // ... rest omitted
}

run();
