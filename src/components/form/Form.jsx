import React  from "react"
import { v4 } from "uuid"; 

export function FormExample({ formContent, selectOptions, functionName, selectRef }) {  

    return (
        <div className="relative flex flex-col justify-center overflow-hidden">
            <div className="w-full p-2 mb-8 m-auto text-black dark:text-gray-300 rounded-md lg:max-w-xl">
                <form onSubmit={(e) => functionName(e)}>
                    {formContent.map((client) => { 
                        return (
                            <div key={v4()} className={client.class ? client.class : "mb-2 "}>
                                <label
                                    htmlFor={client.id}
                                    className="labelClass"
                                >
                                    {client.title}
                                </label>
                                <input
                                    defaultValue={client.value ?? ""}
                                    type={client.type} id={client.id}
                                    className={"formInput"}
                                />
                            </div>
                        )
                    })} 
                    {selectOptions && (
                        <div className="mb-2">
                            <select ref={selectRef} id={selectOptions.id} className="formInput text-black pl-1 mt-8">
                                <option defaultValue>{selectOptions.option1}</option>
                                <option value={"reliability"}>{selectOptions.option2}</option>
                                <option value={"disposable"}>{selectOptions.option3}</option>
                                <option value={"average"}>{selectOptions.option4}</option>
                            </select>
                        </div>
                    )}
                    <div className="mt-6">
                        <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Jo'natish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}