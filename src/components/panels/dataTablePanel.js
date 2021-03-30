import React from 'react'
import { Box, Button, TextInput, Table, TableHeader, TableRow, TableCell, TableBody, Text, Form, FormField, Spinner } from 'grommet';
import { Search, FormEdit, CircleAlert } from 'grommet-icons';

// custom exported functions
import firebaseFunctions from "../../firebaseFunctions.js";
import helper from "../../helperFunctions.js"

const DataTablePanel = (props) => {

    const [searchObject, setSearchObject] = React.useState([]);
    const [trackingData, setTrackingData] = React.useState([]);
    const [isLoadingData, setIsLoadingData] = React.useState(false)

    React.useEffect(() => {
        console.log(props)
        const fetchData = async () => {
            setIsLoadingData(true);
            const responseData = await firebaseFunctions.getAllTrackingData();
            if(responseData.error){
                console.log(responseData.error);
            } else {
                setTrackingData(responseData.response);
                console.log(responseData.response)
            }
            setIsLoadingData(false);
        }
        
        fetchData();

    },[])

    const getSearchedData = async(searchTerm) => {
        setIsLoadingData(true);
        if(!searchTerm){
            const responseData = await firebaseFunctions.getAllTrackingData();
            if(responseData.error){
                console.log(responseData.error);
            } else {
                setTrackingData(responseData.response);
                console.log(responseData.response)
            }
        } else {
            const responseData = await firebaseFunctions.searchTrackingData(searchTerm);
            if(responseData.error){
                console.log(responseData.error);
            } else {
                setTrackingData(responseData.response);
                console.log(responseData.response)
            }
        }
        setIsLoadingData(false);
    }

    const editSelectedData = (data) => {
        if(props.setEditData){
            props.setEditData(data);
        }
    }

    const getFinalState = (data) => {
        
        let keys = ["delivered_date","received_date","shipped_date","ready_date","ordered_date"];
        let colors = ["#00873D", "#00C781", "#FFCA58", "#fa9200", "#FF4040"]
        let finalStatus = {};

        for(let i=0; i < keys.length; i++){
            if(keys[i] in data){
                finalStatus = {
                    status : (keys[i].split('_')[0]),
                    date : data[keys[i]].toLocaleString(),
                    color : colors[i]
                }
                break;
            }
        }

        if(!finalStatus){
            finalStatus = {
                status : "Invalid Status",
                date : "-"
            }
        }

        return finalStatus;
    }

    return(
        <>
            <Box fill>
                <Box
                    direction="row"
                    justify="between"
                >
                    <Form
                        value={searchObject}
                        onChange={nextValue => setSearchObject(nextValue)}
                        onSubmit={({ value }) => { getSearchedData(value.searchTerm) }}
                    >
                        <Box direction="row">
                            <FormField>
                                <TextInput
                                    placeholder="Search by invoice here"
                                    name="searchTerm"
                                    icon={<Search/>}
                                />
                            </FormField>
                            <Button primary type="submit" margin={{"horizontal": "small", vertical:"xsmall"}} label="Search" className="button-style"/>
                        </Box>

                    </Form>

                    {isLoadingData && <Spinner size="medium" align="end"/>}

                </Box>
                <Box margin={{"vertical": "large"}}>
                <Table>
                    <TableHeader>
                        <TableRow style={{background: '#f5f5f5'}}>
                            <TableCell scope="col" border="bottom" size="medium" pad={{vertical:"small", horizontal: "small"}}>
                                <strong>Invoice Number</strong>
                            </TableCell>
                            <TableCell scope="col" border="bottom" size="large" pad={{vertical:"small", horizontal: "small"}}>
                                Name
                            </TableCell>
                            <TableCell scope="col" border="bottom" size="medium" pad={{vertical:"small", horizontal: "small"}}>
                                Current Status
                            </TableCell>
                            <TableCell scope="col" border="bottom" size="xlarge" pad={{vertical:"small", horizontal: "small"}}>
                                Status Date
                            </TableCell>
                            <TableCell scope="col" border="bottom" size="small" pad={{vertical:"small", horizontal: "small"}} align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trackingData ? trackingData.map((tracked, index) => {
                                return(
                                    <TableRow key={tracked.invoice}>
                                        <TableCell 
                                            scope="row" 
                                            size="medium"  
                                            border="bottom" 
                                            pad={{vertical:"medium", horizontal: "small"}}
                                        >
                                            <strong>{tracked.invoice}</strong>
                                        </TableCell>
                                        <TableCell 
                                            size="large"  
                                            border="bottom"
                                            pad={{vertical:"medium", horizontal: "small"}}
                                        >
                                            {tracked.name}
                                        </TableCell>
                                        <TableCell 
                                            size="medium" 
                                            style={{textTransform: "capitalize"}}
                                            border="bottom"
                                            pad={{vertical:"medium", horizontal: "small"}}
                                        >
                                            <div style={{ display: 'flex'}}>
                                                <div 
                                                    style={{background: getFinalState(tracked).color, height: '20px', width: '20px', borderRadius: '50%', margin: '-2px 10px 0px 0px'}}>
                                                </div>
                                                {getFinalState(tracked).status}
                                            </div>
                                        </TableCell>
                                        <TableCell 
                                            size="xlarge" 
                                            border="bottom"
                                            pad={{vertical:"medium", horizontal: "small"}}
                                        >
                                            {helper.formatDate(getFinalState(tracked).date)}
                                        </TableCell>
                                        <TableCell 
                                            size="small" 
                                            border="bottom"
                                            pad={{vertical:"medium", horizontal: "small"}}
                                        >
                                            <Box plain>
                                                <Button 
                                                    plain 
                                                    hoverIndicator 
                                                    icon={<FormEdit/>} 
                                                    label="Edit"
                                                    onClick={() => editSelectedData(tracked)}/>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                        })
                            : <Text>No Entries Found</Text>
                        }
                    </TableBody>
                </Table>
                </Box>
            </Box>
        </>
    )
}

export default DataTablePanel;
