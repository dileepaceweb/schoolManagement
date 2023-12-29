const nameRegex = /^[a-zA-Z\s]+$/;
const rollNoRegex = /^[a-zA-Z0-9]+$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

module.exports = { nameRegex, rollNoRegex, strongPasswordRegex };
