import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { BASE_URL } from '../services/axios';



export const CardPerson = () => {
    const perPage = 6;

    const [persons, setPersons] = useState<any>({
        data: [],
        loading: false,
        page: 1,
    });

    const setup = () => {
        if (persons.loading) return;

        const { page } = persons;

        setPersons({ loading: true });

        axios.get(`${BASE_URL}api/users?page=${page}&size=${perPage}`).then((response) => {
            console.log('response', response.data);
            setPersons({ data: [...persons.data, ...response.data], loading: false, page: page + 1 });

        }).catch((err) => console.error(err));
    }

    const cardItem = (item: any) => {
        return (
            <View style={{ backgroundColor: 'red', marginTop: 20, padding: 30 }}>
                <Text>{item.item.name}</Text>
            </View>
        )
    }

    const renderFooter = () => {
        if (!persons.loading) return;
        return (
            <ActivityIndicator />
        )
    }

    useEffect(() => {
        setup();
    }, []);

    return (
        <FlatList
            contentContainerStyle={{ paddingHorizontal: 20 }}
            style={{ marginTop: 20 }}
            data={persons.data}
            renderItem={(data) => cardItem(data)}
            keyExtractor={(data) => data.id.toString()}
            onEndReached={setup}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
        />
    )
}