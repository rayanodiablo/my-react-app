import { useState } from "react";


export default function useForm(initialValues) {
    const [formData, setFormData] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return { formData, setFormData, isLoading, setIsLoading, errorMessage, setErrorMessage, handleInputChange };
}