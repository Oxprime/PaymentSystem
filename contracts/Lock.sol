// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SalarySystem {
    address public employer;
    
    struct Employee {
        address wallet;
        uint salary;
        bool isEmployed;
    }

    mapping(address => Employee) public employees;

    modifier onlyEmployer() {
        require(msg.sender == employer, "Not employer");
        _;
    }

    constructor() {
        employer = msg.sender;
    }

    function addEmployee(address _wallet, uint _salary) public onlyEmployer {
        employees[_wallet] = Employee(_wallet, _salary, true);
    }

    function removeEmployee(address _wallet) public onlyEmployer {
        employees[_wallet].isEmployed = false;
    }

    function paySalary(address _wallet) public payable onlyEmployer {
        Employee memory emp = employees[_wallet];
        require(emp.isEmployed, "Not employed");
        require(msg.value == emp.salary, "Incorrect salary amount");
        payable(_wallet).transfer(msg.value);
    }

    function getEmployee(address _wallet) public view returns (uint salary, bool isEmployed) {
        Employee memory emp = employees[_wallet];
        return (emp.salary, emp.isEmployed);
    }
    function isEmployee(address _wallet) public view returns (bool) {
    return employees[_wallet].isEmployed;
}

}
