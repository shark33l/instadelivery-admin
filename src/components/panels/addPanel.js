import React from 'react';
import { Box, Heading, Form, FormField, TextInput, Button, DateInput, Spinner, Text } from 'grommet';
import { AddCircle } from 'grommet-icons';

// Firebase
import databaseFunctions from "../../databaseFunctions.js";
import { AuthContext } from "../../Auth.js";



const AddPanel = (props) => {

    // Context from consumer
    const { currentUser } = React.useContext(AuthContext);

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
        databaseFunctions.setTrackingData(value, currentUser, function(error){
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
                 <FormField name="processing_date" htmlFor="processing_date-id" label={<Text size="small">Processing Date</Text>}>
                    <DateInput
                        id="processing_date-id"
                        name="processing_date"
                        format="mm/dd/yyyy"
                        calendarProps= {{
                            bounds : [value.ordered_date, new Date(new Date().setFullYear(new Date().getFullYear() + 1))]
                        }}
                    />
                </FormField>
                }
                {value.processing_date &&
                <FormField name="ontheway_date" htmlFor="ontheway_date-id" label={<Text size="small">On the Way Date</Text>}>
                    <DateInput
                        id="ontheway_date-id"
                        name="ontheway_date"
                        format="mm/dd/yyyy"
                        calendarProps= {{
                            bounds : [value.processing_date, new Date(new Date().setFullYear(new Date().getFullYear() + 1))]
                        }}
                    />
                </FormField>
                }
                {value.ontheway_date &&
                <FormField name="pickup_date" htmlFor="pickup_date-id" label={<Text size="small">Pickup Date</Text>}>
                    <DateInput
                        id="pickup_date-id"
                        name="pickup_date"
                        format="mm/dd/yyyy"
                        calendarProps= {{
                            bounds : [value.ontheway_date, new Date(new Date().setFullYear(new Date().getFullYear() + 1))]
                        }}
                    />
                </FormField>
                }
                {value.pickup_date &&
                <FormField name="delivered_date" htmlFor="delivered_date-id" label={<Text size="small">Delivered Date</Text>}>
                    <DateInput
                        id="delivered_date-id"
                        name="delivered_date"
                        format="mm/dd/yyyy"
                        calendarProps= {{
                            bounds : [value.pickup_date, new Date(new Date().setFullYear(new Date().getFullYear() + 1))]
                        }}
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