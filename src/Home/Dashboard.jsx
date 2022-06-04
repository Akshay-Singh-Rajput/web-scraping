import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Box,
    Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

export const Dashboard = () => {
    const [ formData, setFormData ] = useState({
        location: "",
        technology: "",
    });

    const [ jobsArr, setJobsArr ] = useState([]);

    const getData = async (technology, location) => {
        const customURL = `https://www.google.com/search?ei=HSq0Xt7IDoz5gQbGip6ABg&q=${technology}+${location}&oq=${technology}+${location}+jobs+&gs_lcp=CgZwc3ktYWIQAzIFCCEQoAEyBQghEKABMgUIIRCgATIFCCEQoAE6BggAEAgQHjoGCAAQFhAeUOYSWNIXYIIZaABwAHgAgAGrAYgB7QaSAQM1LjOYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&uact=5&ibp=htl;jobs&sa=X&ved=2ahUKEwiH6N6-iaLpAhX9QUEAHTWjBGMQiYsCKAF6BAgKEBE#fpstate=tldetail&htivrt=jobs&htidocid=odTsQfLDpmatfzNQAAAAAA%3D%3D`;

        const dataToSend = { customURL, technology },
            fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            };
        await fetch("http://localhost:5000/job", fetchOptions)
            .then((res) => res.json())
            .then((data) => {
                setJobsArr(data);
                // console.log(jobsArr);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [ id ]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { location, technology } = formData;

        getData(technology, location);

    };
    useEffect(() => {
        console.log(jobsArr);
    }, [ jobsArr ]);
    return (
        <div>
            <Container maxW="100%">
                <FormControl p="20px">
                    <HStack >

                        <FormLabel>Location</FormLabel>
                        <Input
                            type="text"
                            placeholder="Search"
                            id="location"
                            onChange={ handleChange }
                        />
                        <FormLabel>Technologies</FormLabel>
                        <Input
                            type="text"
                            placeholder="Search"
                            id="technology"
                            onChange={ handleChange }
                        />
                        <Button
                            type="submit"
                            value="Submit"
                            colorScheme="teal"
                            onClick={ handleSubmit }
                            w="50%"
                        >
                            Submit
                        </Button>
                    </HStack>
                </FormControl>
                <Box textAlign='left' w='50%' m='auto'>

                    { jobsArr ? jobsArr.map((job, i) => {
                        return (
                            <Box key={ i } mt='10px' border='1px solid black' p='1rem'>
                                <h1 style={ { fontSize: '20px' } }>Title : { job.title }</h1>
                                <p>Company : { job.company }</p>
                                <p>Location : { job.location }</p>
                                <a style={ { color: 'blue' } } href={ job.hrefs }>Link</a>
                            </Box>
                        );
                    }) : 'Loading...' }

                </Box>
            </Container>
        </div >
    );
};
