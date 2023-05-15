import { View, Text, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { MyContext } from '../Context/SelectedItemContext';
import RenderHtml from 'react-native-render-html';
import styles from '../styles';

export default function Blog() {
    const { contextValue } = useContext(MyContext);
    const { width } = useWindowDimensions();

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.blog}>
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: contextValue.content }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}