import React from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import { Image, Flex, Text, Divider } from "@chakra-ui/react"
import wallpaper from "./lookAlikePinkGran.jpg"
import wallpaper1 from "./lookAlikeYellow.jpg"
import wallpaper2 from "./lookAlikeBlue.jpg"
import "./Splash.css"



const Splash = () => {
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    if (user) {
        history.push("/main")
    }

    return (
        <div id="splash__container">
            <Flex minHeight="100%" minWidth="100%">
                <Flex alignItems="center" flexDirection="column" minWidth="200px" minHeight="200px">
                    <Text letterSpacing="4px" padding="5" fontWeight="bold" fontSize="xl">New to the Neighborhood</Text>
                    <Image paddingTop="3" src={wallpaper} objectFit="contain" />
                    <div></div>
                    <Text paddingTop="5" fontWeight="bold" fontSize="xl">Meet Your Neighbors</Text>
                    <Divider />
                    <Text paddingTop="5" maxInlineSize="350" textAlign="center" fontWeight="semibold" fontSize="md" >Regular meetings bring neighbors together to talk and get to know one another. This leads to a greater sense of unity within the neighborhood and can also bring neighbors together as friends</Text>
                </Flex>
                <Flex alignItems="center" flexDirection="column" minWidth="200px" minHeight="200px">
                    <Text letterSpacing="4px" padding="5" fontWeight="bold" fontSize="xl">Your Dog Needs Friends</Text>
                    <Image paddingTop="3" src={wallpaper1} objectFit="contain" />
                    <div></div>
                    <Text paddingTop="5" fontWeight="bold" fontSize="xl">Dogs Need to Socialize</Text>
                    <Divider />
                    <Text paddingTop="5" maxInlineSize="350" textAlign="center" fontWeight="semibold" fontSize="md">When you socialize your dog, you are essentially teaching them how to exist among others in the world.  A socialized puppy will grow into a confident dog. A socialized dog can handle new interactions and experiences without growing overly anxious, fearful, or aggressive.</Text>
                </Flex>
                <Flex alignItems="center" flexDirection="column" minWidth="200px" minHeight="200px">
                    <Text letterSpacing="4px" padding="5" fontWeight="bold" fontSize="xl">Never Walk Alone</Text>
                    <Image paddingTop="3" src={wallpaper2} objectFit="contain" />
                    <div></div>
                    <Text paddingTop="5" fontWeight="bold" fontSize="xl">Feel Safer in Your Neighborhood</Text>
                    <Divider />
                    <Text paddingTop="5" maxInlineSize="350" textAlign="center" fontWeight="semibold" fontSize="md">Particularly important if you live somewhere with a high crime rate (after all, we want you and your dog to be safe!). It also happens to be more enjoyable.</Text>
                </Flex>
            </Flex>
        </div>
    )
}


export default Splash
