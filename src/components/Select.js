import React from "react";
import {FormFeedback, FormGroup, Input, Label, Spinner} from "reactstrap";

function Select({name, label, value, onChange, options, loading, placeholder, invalid, errorMessage}) {

    placeholder = placeholder || "Selecione uma opção"; // Define um valor padrão para o placeholder

    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input
                type="select"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={loading} // Desabilita o select enquanto os dados estão sendo carregados
                invalid={invalid}
            >
                {loading ? (
                    <option value="" disabled>
                        <Spinner
                            color="primary"
                            size="sm"
                        >
                            Carregando...
                        </Spinner>
                    </option> // Exibe "Loading..." enquanto os dados estão sendo carregados
                ) : (
                    <>
                        <option value="">{placeholder}</option>
                        {/* Placeholder exibido apenas quando loading = false */}
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </>
                )}
            </Input>
            {invalid && <FormFeedback>{errorMessage}</FormFeedback>}
        </FormGroup>
    );
}

export default Select;