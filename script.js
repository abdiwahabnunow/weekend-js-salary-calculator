const employeeForm = document.getElementById('employeeForm');
const employeeTableBody = document.querySelector('#employeeTable tbody');
const totalMonthlyExpenseElem = document.getElementById('totalMonthlyExpense');

let totalAnnualSalary = 0;

function handleSubmitForm(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const jobTitle = document.getElementById('JobTitle').value.trim();
    const annualSalary = Number(document.getElementById('annualSalary').value);

    if (isNaN(annualSalary) || annualSalary <= 0) {
        alert("Please enter a valid annual salary.");
        return;
    }

    // Add to total annual salary
    totalAnnualSalary += annualSalary;
    updateTotalMonthlyExpense();

    const monthlyExpense = (annualSalary / 12).toFixed(2);

    const row = document.createElement('tr');
    row.dataset.salary = annualSalary; // Store salary for future subtraction

    row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${idNumber}</td>
        <td>${jobTitle}</td>
        <td>$${annualSalary.toLocaleString()}</td>
        
        <td><button onclick="removeRow(this)">Remove</button></td>
    `;

    employeeTableBody.appendChild(row);

    // Clear form
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('idNumber').value = '';
    document.getElementById('JobTitle').value = '';
    document.getElementById('annualSalary').value = '';
}

function removeRow(button) {
    const row = button.closest('tr');
    const salaryToRemove = Number(row.dataset.salary);

    totalAnnualSalary -= salaryToRemove;
    row.remove();

    updateTotalMonthlyExpense();
}

function updateTotalMonthlyExpense() {
    const monthlyExpense = (totalAnnualSalary / 12).toFixed(2);
    totalMonthlyExpenseElem.textContent = `Total Monthly Expense: $${monthlyExpense}`;
    changeColor();
}


function changeColor() {
    const element = document.getElementById("totalMonthlyExpense");
    
  
    const text = element.textContent;
    const match = text.match(/\$([0-9,.]+)/);
    const value = match ? parseFloat(match[1].replace(/,/g, '')) : 0;

    if (value > 20000) {
        element.style.color = "red"; // Over budget
    } else {
        element.style.color = "green"; // Within budget
    }
}

employeeForm.onsubmit = handleSubmitForm;
