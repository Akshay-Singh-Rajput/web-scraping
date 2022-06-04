import React from 'react';
import { Container, Link, HStack } from '@chakra-ui/react';
export const Navbar = () => {
    return (
        <Container maxW='100%' border='1px solid black' bg='teal.200' h='40px'>
            <HStack spacing={ '10' } justifyContent='space-around' alignItems='center'>
                <Link href="/">Job Search</Link>
                <Link href="/">Title</Link>
                <Link href="/">React</Link>
                <Link href="/">Location</Link>
                <Link href="/">Profile</Link>
            </HStack>
        </Container>
    );
};
