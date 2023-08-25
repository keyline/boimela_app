import { View, Text, Image, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImagePath } from '../../Utils/ImagePath';

const Width = Dimensions.get('window').width
const Height = Dimensions.get('window').height

const myArr = [
    { id: 1, src: ImagePath.no_image }
]

const Banner = ({ data }) => {

    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (data) {
                let nextSlide = activeSlide + 1;
                if (nextSlide >= data?.length) {
                    nextSlide = 0; // Reset to the first slide
                }
                carouselRef.current.snapToItem(nextSlide);
            }
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval); // Clean up the interval on component unmount
        };
    }, [activeSlide, data]);

    const renderItem = ({ item }) => (
        <View style={styles.itemcontainer}>
            <Image source={{ uri: item?.src }} style={styles.bannerimg} />
        </View>
    )

    const renderItemNew = ({ item }) => (
        <View style={styles.itemcontainer}>
            <Image source={item?.src} style={styles.bannerimg} />
        </View>
    )

    const ActiveDot = () => (
        <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                // backgroundColor: 'rgba(255, 255, 255, 0.92)'
                backgroundColor: 'red'
            }}
            inactiveDotStyle={{
                // Define styles for inactive dots here
            }}
        // inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
        />
    )

    return (
        <View style={styles.container}>
            {(data && data.length > 0) ?
                (
                    <Carousel
                        ref={carouselRef}
                        data={data}
                        renderItem={renderItem}
                        sliderWidth={Width}
                        itemWidth={Width}
                        windowSize={1}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        enableSnap={true}
                        loop
                    />
                )
                :
                (
                    <Carousel
                        ref={carouselRef}
                        data={myArr}
                        renderItem={renderItemNew}
                        sliderWidth={Width}
                        itemWidth={Width}
                        windowSize={1}
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                        onSnapToItem={(index) => setActiveSlide(index)}
                        enableSnap={true}
                        loop
                    />
                )}
        </View>
    )
}

export default Banner