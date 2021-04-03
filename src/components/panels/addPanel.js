import React from 'react';
import { Box, Heading, Form, FormField, TextInput, Button, DateInput, Spinner, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

// Firebase
import firebaseFunctions from "../../firebaseFunctions.js";


const AddPanel = (props) => {
    const [entryType, setEntryType] = React.useState(0)
    const [value, setValue] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const entryFormRef = React.useRef(null);

    // React.useEffect(() => {
    //     setorderedDate((new Date()).toISOString())
    // }, [])

    // functions
    const addNewEntry = () => {
        setValue({})
        setEntryType(0)
        entryFormRef.current.reset();
        if(props.setEditData){
            props.setEditData({});
        }
    }

    const changeToEditData = (data) => {
        setValue(data);
        setEntryType(1);
    }

    const validateValues = (values) => {
        for (let key in values){
            if(values[key] === undefined || !values[key]){
                delete values[key]
            }
        }

        return values;
    }

    const submitEntry = (value) => {
        value.invoice = value.invoice.toUpperCase();
        value = validateValues(value);
        setLoading(true);
        firebaseFunctions.setTrackingData(value, function(error){
            if(error){
                console.log("Error occured");
            } else {
                setValue({});
                setEntryType(0);
                entryFormRef.current.reset();

                if(props.setLoadFirebaseData){
                    props.setLoadFirebaseData(!props.loadFirebaseData);
                }
            }

            setLoading(false);
        })
    }

    React.useEffect(() => {
        if(props.editData && Object.keys(props.editData).length !== 0){
            changeToEditData(props.editData);
        }
    }, [props.editData])

    return(
        <>
            {entryType !== 0 &&
                <Box
                    animation={{type:"slideDown", delay:0, size:"large", duration:500}}
                    justify="center"
                    align="start"
                    pad={{bottom:"medium"}}
                >
                    <Button 
                        secondary 
                        style={{color: "#1D337C"}}
                        icon={<AddCircle color="brand"/>} 
                        label="Add New Entry" 
                        reverse 
                        onClick={addNewEntry}
                        focusIndicator={false}
                    />
                </Box>
            }
            {entryType === 0 ?
                <Heading level="4" style={{marginTop: 0}}>Add New Entry</Heading>
                :
                <Heading level="4" style={{marginTop: 0}}>Edit Existing Entry : <span style={{color: "#a1a1a1"}}>{props.editData ? props.editData.invoice : ''}</span></Heading>
            }
            <Form
                ref={entryFormRef}
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => {if(entryType===1){setValue({invoice: value.invoice})}else{setValue({})}}}
                onSubmit={({ value }) => { submitEntry(value) }}
                defaultValue={{invoice:"", name:""}}
            >
                <FormField name="invoice" htmlFor="invoice-id" label={<Text size="small">Invoice Number</Text>} required>
                    <TextInput id="invoice-id" name="invoice" disabled={entryType===1}/>
                </FormField>
                <FormField name="name" htmlFor="text-input-id" label={<Text size="small">Name</Text>} required>
                    <TextInput id="name-id" name="name" />
                </FormField>
                <FormField name="ordered_date" htmlFor="ordered_date-id" label={<Text size="small">Ordered Date</Text>} required>
                    <DateInput
                        id="ordered_date-id"
                        name="ordered_date"
                        format="mm/dd/yyyy"
                    />
                </FormField>
                {value.ordered_date &&
                 <FormField name="ready_date" htmlFor="ready_date-id" label={<Text size="small">Ready Date</Text>}>
                    <DateInput
                        id="ready_date-id"
                        name="ready_date"
                        format="mm/dd/yyyy"
                    />
                </FormField>
                }
                {value.ready_date &&
                <FormField name="shipped_date" htmlFor="shipped_date-id" label={<Text size="small">Shipped Date</Text>}>
                    <DateInput
                        id="shipped_date-id"
                        name="shipped_date"
                        format="mm/dd/yyyy"
                    />
                </FormField>
                }
                {value.shipped_date &&
                <FormField name="received_date" htmlFor="received_date-id" label={<Text size="small">Received Date</Text>}>
                    <DateInput
                        id="received_date-id"
                        name="received_date"
                        format="mm/dd/yyyy"
                    />
                </FormField>
                }
                {value.received_date &&
                <FormField name="delivered_date" htmlFor="delivered_date-id" label={<Text size="small">Delivered Date</Text>}>
                    <DateInput
                        id="delivered_date-id"
                        name="delivered_date"
                        format="mm/dd/yyyy"
                    />
                </FormField>
                }
                {!loading?
                    <Box direction="row" gap="medium" margin={{"vertical":"medium"}}>
                        <Button type="submit" primary label="Submit" className="button-style"/>
                        <Button type="reset" label="Reset" style={{color: "#1D337C"}} className="button-style"/>
                    </Box>  
                    : 
                    <div style={{ display: 'flex', marginTop: "20px"}}>
                        <Spinner/>
                        <Text margin={{"horizontal": "medium"}}>Saving Data...</Text>
                    </div>
                }
            </Form>
        </>
    )
}

export default AddPanel;