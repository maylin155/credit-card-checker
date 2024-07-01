// Function to validate a credit card number using the Luhn algorithm
function validateCard(array) {
    let sum = 0;
    let isSecond = false;
    
    for (let i = array.length - 1; i >= 0; i--) {
      let digit = array[i];
      
      if (isSecond) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
  
      sum += digit;
      isSecond = !isSecond;
    }
    
    return sum % 10 === 0;
  }


  
  // Function to handle form submission
  function handleSubmit(event) {

    event.preventDefault();
    
    // Get the credit card number input value
    let creditCardNumber = document.getElementById('creditCardNumber').value.trim();
    
    // Check if credit card number meets minimum length (e.g., 13 for Visa, Mastercard, Discover; 15 for Amex)
    if (creditCardNumber.length < 13) {
      alert('Credit card number should be at least 13 digits long.');
      return;
    }
  
    // Convert input value to array of numbers
    let arr = Array.from(creditCardNumber, Number);
    
    // Validate the credit card number
    let isValid = validateCard(arr);
    if (validateCard(arr)){
      showValidationStatus(true);
    } else {
      showValidationStatus(false)
    }
    addCardToList(creditCardNumber, isValid);
  
    // Clear the input field
    document.getElementById('creditCardNumber').value = '';
  }


  function showValidationStatus(isValid) {
    let validationStatus = document.getElementById('validationStatus');
    
    if (isValid) {
      validationStatus.innerHTML = '<img width="15" height="15" src="https://img.icons8.com/color/48/checked--v1.png" alt="checked--v1"/><p>The card is valid</p>';
      validationStatus.className = 'valid';
    } else {
      validationStatus.innerHTML = '<div style="display:flex;gap:2px;justify-content:center"><img "width="15" height="15" src="https://img.icons8.com/color/48/error--v1.png" alt="error--v1"/><p>The card is invalid.</p><div>';
      validationStatus.className = 'invalid';
    }
  }

  
  
  // Function to add a credit card number to the list
  function addCardToList(cardNumber, isValid) {
    let cardList = document.getElementById('cardList');
    let listItem = document.createElement('li');
    listItem.className = isValid ? 'valid' : 'invalid';
    listItem.textContent = `${cardNumber} - ${isValid ? 'Valid' : 'Invalid'}`;
    
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
      cardList.removeChild(listItem);
    };
    
    listItem.appendChild(deleteButton);
    cardList.appendChild(listItem);
  }
  
  // Function to handle restart button click
  function handleRestart() {
    // Clear the credit card number input field
    document.getElementById('creditCardNumber').value = '';
    
    // Clear the validation status message
    let validationStatus = document.getElementById('validationStatus');
    validationStatus.textContent = '';
    validationStatus.className = '';
    
    // Clear the card list
    document.getElementById('cardList').innerHTML = '';
  }
  
  // Add event listeners
  document.getElementById('creditCardForm').addEventListener('submit', handleSubmit);
  document.getElementById('restartButton').addEventListener('click', handleRestart);
  