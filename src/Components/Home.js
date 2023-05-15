
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,

} from 'react-native';
import { useNavigation } from '@react-navigation/native';


import React, { useState, useEffect , useContext} from 'react';
import api from "../API/get"
import styles from '../styles';
import { MyContext } from '../Context/SelectedItemContext';

export default function Home() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Add this line
  const [expandedItems, setExpandedItems] = useState([]);
  const { setContextValue } = useContext(MyContext);

  const navigation = useNavigation();


  const handleReadMore = (itemId) => {
    setExpandedItems((prevExpandedItems) => [...prevExpandedItems, itemId]);
  };

  const handleShowLess = (itemId) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.filter((id) => id !== itemId)
    );
  };

  const isItemExpanded = (itemId) => {
    return expandedItems.includes(itemId);
  };


  const fetchData = async (pageNum) => {
    try {
      const response = await api.get(`?page=${pageNum}&count=10`);
      setTotalCount(response.data.totalCount); // Update to response.data.totalCount
      return response.data.result; // Update to response.data.result
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  const fetchNewsData = async (pageNum) => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setIsLoading(true);
      const newData = await fetchData(pageNum);
      const filteredData = newData.filter(item => !data.some(existingItem => existingItem.postId === item.postId));
      setData(prevData => [...prevData, ...filteredData]);
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };


  const refreshNewsData = async () => {
    setIsRefreshing(true);
    setPage(1);
    const newData = await fetchData(1);
    setData(newData);
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchNewsData(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!isFetchingMore && data.length < totalCount) { // Add the condition !isFetchingMore
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleSelectedItem = (item) => {
    setContextValue(item);
    navigation.navigate('Blog');
    // Navigate to the second page using navigation.navigate('SecondPage');
  };
 

  return (
      <SafeAreaView>
        {isLoading && <ActivityIndicator size='large' />}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => handleSelectedItem(item)}>
                <View style={styles.imagepreviewcontainer}>
                  <Image
                    source={{ uri: item.banner }}
                    style={styles.imageStyle}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.TitleText} onPress={() => handleSelectedItem(item)}>
                {item.title}
              </Text>
              <View style={styles.summaryContainer}>
                <Text
                  numberOfLines={isItemExpanded(item.postId) ? undefined : 3}
                  style={styles.paragraph}
                >
                  {item.summary}
                </Text>
                {!isItemExpanded(item.postId) ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleReadMore(item.postId)}
                    >
                      <Text style={styles.readMoreButton}>Read More</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>
                      {item.totalReadingTime} Minutes
                    </Text>
                  </View>
                ) : (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      onPress={() => handleShowLess(item.postId)}
                    >
                      <Text style={styles.readMoreButton}>Show Less</Text>
                    </TouchableOpacity>
                    <Text style={styles.TitleText}>
                      {item.totalReadingTime} Minutes
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          keyExtractor={(item) => item.postId}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          onRefresh={refreshNewsData}
          refreshing={isRefreshing}
        />
      </SafeAreaView>

    // <View>
    //    <RenderHtml
    //             contentWidth={width}
    //             source={{ html: data[0]?.content }}
    //           />
    // </View>
  )
}