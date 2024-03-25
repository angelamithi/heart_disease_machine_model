import React, { useState } from 'react';

const Predict = () => {
  const initialFormData = {
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '1',
    ca: '',
    thal: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for required fields
    const requiredFields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      setError(`${missingFields.join(', ')} is required`);
      return;
    }

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      // Handle prediction response
      console.log(data);
      if (data === 0) {
        setPredictionResult('No heart disease predicted');
      } else {
        setPredictionResult('Heart disease predicted');
      }
      setError(null);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Error occurred while processing the request');
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setPredictionResult(null);
    setError(null);
  };
  return (
    <div>
     <h4>Enter Patient's vital signs..</h4>
    <form className='prediction-form' onSubmit={handleSubmit}>
    
      <label>
        Age:
        <input type="text" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Sex:
        <select name="sex" value={formData.sex} onChange={handleChange}>
        <option value="" disabled>Select Gender</option>
         
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>
      </label>
      <label>
        Chest Pain Type:
        <select name="cp" value={formData.cp} onChange={handleChange}>
        <option value="" disabled>Select Chest Pain</option>
          <option value="0">Typical angina</option>
          <option value="1">Atypical angina</option>
          <option value="2">Non-anginal pain</option>
          <option value="3">Asymptomatic</option>
        </select>
      </label>
      <label>
        Resting Blood Pressure (mm Hg):
        <input type="text" name="trestbps" value={formData.trestbps} onChange={handleChange} />
      </label>
      <label>
        Cholestrol (serum cholestoral in mg/dl ):
        <input type="text" name="chol" value={formData.chol} onChange={handleChange} />
      </label>
   
      <label>
        Fasting Blood Sugar (>120 mg/dl):
        <select name="fbs" value={formData.fbs} onChange={handleChange}>
        <option value="" disabled>is level of fbs >120 mg ?</option>
          
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      <label>
        Resting Electrocardiographic Results:
        <select name="restecg" value={formData.restecg} onChange={handleChange}>
        <option value="" disabled>Select Resting ECG</option>
          <option value="0">Normal</option>
          <option value="1">ST-T wave abnormality</option>
          <option value="2">Probable or definite left ventricular hypertrophy</option>
        </select>
      </label>
      <label>
        Maximum Heart Rate Achieved:
        <input type="text" name="thalach" value={formData.thalach} onChange={handleChange} />
      </label>
      <label>
        Exercise Induced Angina:
        <select name="exang" value={formData.exang} onChange={handleChange}>
        <option value="" disabled>is it Exercised Induced Angina?</option>
        
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      <label>
        ST Depression Induced by Exercise Relative to Rest:
        <input type="text" name="oldpeak" value={formData.oldpeak} onChange={handleChange} />
      </label>
      <label>
        Slope of the Peak Exercise ST Segment:
        <select name="slope" value={formData.slope} onChange={handleChange}>
        <option value="" disabled>Select slope of Peak Exercise</option>
          <option value="0">Upsloping</option>
          <option value="1">Flat</option>
          <option value="2">Downsloping</option>
        </select>
      </label>
      <label>
        Number of Major Vessels Colored by Flouroscopy:
        <select name="ca" value={formData.ca} onChange={handleChange}>
        <option value="" disabled>Select Number of Major Vessels</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>
      <label>
        Thalassemia:
        <select name="thal" value={formData.thal} onChange={handleChange}>
        <option value="" disabled>Select type of Thal</option>
          <option value="1">Normal</option>
          <option value="2">Fixed defect</option>
          <option value="3">Reversible defect</option>
        </select>
      </label>
      <button type="submit">Predict</button>
    </form>
    
    {predictionResult && <h2>{predictionResult}</h2>}
    {error && <p>{error}</p>}
    </div>
  );
};

export default Predict;
