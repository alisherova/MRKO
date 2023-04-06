import React, { useContext, useRef, useState } from "react";
import { FormExample } from "./form/Form";
import Button from "./button/Button";
import Modal from "./modal/Modal";
import Table from "./table/Table";
import apiService from "../api/index.js";
import { MainCtx } from "../contexts/MainContext";
import Details from "./Details";
// [archuvchi, chopuvchi, tikaluvchi, lentachi, arrachi, sotuvchi, boshqaruvchi, hisobchi, yuklovchi]
function EmployeeTableUI() {
    const { employees, setEmployees, setShowModal, setDetails, setIsDetailed, isEditing, setIsEditing } = useContext(MainCtx);
    const [updatedEmployeeId, setUpdatedEmployeeId] = useState(null)
    let employeesForm = [
        { title: "Ism", id: "name", type: "text", value: "" },
        { title: "Telefon raqam", id: "phone_number", type: "number", value: "" },
        { title: "Ishchi turi", id: "type", type: "text", value: "" },
        { title: "Parol", id: "password", type: "password", value: "" },
    ];

    let detailsForm = [
        { title: "Ism", id: "name", type: "text", value: "" },
        { title: "Telefon raqam", id: "phone_number", type: "number", value: "" },
        { title: "Ishchi turi", id: "type", type: "text", value: "" }, 
    ];
    let selectOptions = {
        id: 'status',
        option1: 'Holati',
        option2: 'ishonchlilik',
        option3: 'bir martalik',
        option4: "o'rta me'yordagi" 
    }
    const [employeeForm, setEmployeeForm] = useState(employeesForm)

    // handleDelete
    const handleDelete = (id) => {
        apiService("delete", `employee/${id}`).then((res) => {
            setEmployees(employees.filter((d) => d._id !== id));
            return true;
        });
    };
    const selectRef = useRef(null);

    // addEmployee
    const addEmployee = (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const phone_number = e.target.phone_number.value;
        const password = e.target.password.value;
        const type = e.target.type.value;
        const status = selectRef.current.value;
        let employee = {
            name,
            phone_number: phone_number,
            password: password,
            type: type,
            status: status,
        };

        apiService("post", "employee/create", employee).then((res) => {
            setEmployees([...employees, res.data.employee]);
            setShowModal(false);
        });
        e.target.reset();
    };

    // showDetails
    const showDetails = (id) => {
        apiService("get", `employee/${id}`).then(res => {
            setDetails(res.data.employee);
            setIsDetailed(true)
        })
    }

    // edit employee
    const handleEdit = (e) => {
        e.preventDefault();
        console.log(updatedEmployeeId);
        let updayedEmployee = {
            name: e.target.name.value,
            phone_number: +e.target.phone_number.value,
            password: e.target.password.value,
            new_password: e.target.new_password.value,
            type: e.target.type.value,
            status: selectRef.current.value,
        };
        apiService("patch", `employee/${updatedEmployeeId}`, updayedEmployee).then((res) => { 
            setEmployees(employees.map((employee) => { 
                if(employee._id === updatedEmployeeId){ 
                    employee.name = res.data.employee.name;
                    employee.phone_number = res.data.employee.phone_number; 
                    employee.type = res.data.employee.type;
                    employee.status = res.data.employee.status;
                    return employee;
                } 
                return employee;
            }));
            setShowModal(false);
        });
        e.target.reset(); 
        setIsEditing(false)

    }
    const editEmployee = (id) => {
        setIsEditing(true) 
        
        let newArray = []
        employeeForm.map(i => {
            employees.map(e => {
                if (e._id === id) {
                    i.value = e[i.id]
                    newArray.push({ ...i, value: e[i.id] })
                }
            })
        })
        if ((employeeForm.some((el) => el.id === "new_password") === false)){
            const newInput = { title: "Yangi parol", id: "new_password", type: "password", value: "" }
            newArray.push(newInput)
        }
        setUpdatedEmployeeId(id);
        setEmployeeForm(newArray)  
        setShowModal(true)   
    }

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4 sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="py-5 flex justify-end">
                    <Button
                        onClick={() => setShowModal(true)}
                        children="Ishchi qo'shish"
                        classes="max-sm:hidden block"
                    />
                    <Button
                        onClick={() => setShowModal(true)}
                        classes="max-sm:block hidden">
                        {" "}
                        +{" "}
                    </Button>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-full max-sm:overflow-auto">
                        <Table
                            tb_data={employees}
                            th_data={[
                                { name: "Ishchi turi", key: "type", func: () => false },
                                { name: "Ism", key: "name", func: () => false },
                                { name: "Telefon", key: "phone_number", func: () => false }, 
                                { name: 'Holat', key: 'status', func: () => false },
                                { name: '', key: 'status', func: () => true },
                            ]}
                            action1={handleDelete}
                            showDetails={showDetails}
                            action2={editEmployee}
                        />
                    </div>
                </div>
            </div>
                <Modal headerContext={ isEditing ? "Ishchi ma'lumotlarini yangilash" : "Ishchi qo'shish"}>
                    <FormExample
                        functionName={ isEditing ? handleEdit : addEmployee}
                        formContent={ isEditing ? employeeForm : employeesForm} selectRef={selectRef}
                        selectOptions={selectOptions}
                    />
                </Modal>
            <Details form={detailsForm} />
        </div>
    );
}

export default EmployeeTableUI;