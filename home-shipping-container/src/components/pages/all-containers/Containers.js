import GlobalStyle from "../../global-style/GlobalStyles";
import NavBar from "../../navBar/NavBar";
import React, {useEffect, useState} from "react";
import {Badge, Box, Flex, Heading, Image, Spacer, Spinner, Wrap, WrapItem} from "@chakra-ui/react";
import {StarIcon} from "@chakra-ui/icons";
import {ImageCarouselData} from "../../images/image-carousel-data/ImageCarouselData";
import './ContainersStyle.css';
import {useNavigate} from "react-router-dom";
import Footer from "../../footer/Footer";
import {ApiGetContainer} from "../../service/api-requests/ApiService";

function Containers() {
    const [allContainers, setAllContainers] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        ApiGetContainer("")
            .then(data => {
                setIsLoading(false);
                setAllContainers(data.data);
            }).catch(error => console.log(error));
    }, []);


    return (
        <>
            <GlobalStyle/>
            <NavBar/>
            <section style={{padding: "5rem", marginRight: "1rem"}}>
                <div className="container">
                    <Heading as='h2' size='lg' style={{padding: "1rem"}}>Shipping Containers</Heading>
                    {(isLoading) ?
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        /> :
                        <Wrap spacing='75px'>
                            {allContainers.map((container, index) =>
                                <WrapItem key={index}>
                                    <Box>
                                        <Flex>
                                            <Box maxW="lg"
                                                 borderWidth="1px" rounded="lg"
                                                 overflow="hidden"
                                                 className="card-container"
                                                 onClick={() => navigate("/container/" + container.id)}
                                                 key={index} size
                                            >
                                                <Image src={ImageCarouselData[(container.id - 1)].image}
                                                       alt={container.name} className="card-image"/>
                                                <Box p="6">
                                                    <Box d="flex" alignItems="baseline">
                                                        <Badge rounded="full" px="2" variantColor="teal">
                                                            New
                                                        </Badge>
                                                        <Box
                                                            color="gray.500"
                                                            fontWeight="semi-bold"
                                                            letterSpacing="wide"
                                                            fontSize="xs"
                                                            textTransform="uppercase"
                                                            ml="2"
                                                        >
                                                            3 beds &bull; 2 baths
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        mt="1"
                                                        fontWeight="semibold"
                                                        as="h4"
                                                        lineHeight="tight"
                                                        isTruncated
                                                        style={{marginBottom: "8px", marginTop: "8px"}}
                                                    >
                                                        {container.description}
                                                    </Box>

                                                    <Box>
                                                        {container.pricePerNight} Lei
                                                        <Box as="span" color="gray.600" fontSize="sm">
                                                            / night
                                                        </Box>
                                                    </Box>

                                                    <Box d="flex" mt="2" alignItems="center">
                                                        {Array(5)
                                                            .fill("")
                                                            .map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    color={i < 4 ? "teal.500" : "gray.300"}
                                                                />
                                                            ))}
                                                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                                                            34 reviews
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Spacer/>
                                        </Flex>
                                    </Box>
                                </WrapItem>
                            )}
                        </Wrap>
                    }
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Containers;
