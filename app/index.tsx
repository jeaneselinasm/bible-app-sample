"use client"

import { StyleSheet, View, ScrollView } from "react-native"
import { Text, Card, Button, List, Searchbar } from "react-native-paper"
import { Link } from "expo-router"
import { useState } from "react"

// Mock data for recent readings
const recentReadings = [
  { id: "1", book: "John", chapter: 3, verse: 16 },
  { id: "2", book: "Psalms", chapter: 23, verse: 1 },
  { id: "3", book: "Proverbs", chapter: 3, verse: 5 },
]

// Mock data for popular books
const popularBooks = [
  { id: "1", name: "Psalms", testament: "Old Testament" },
  { id: "2", name: "John", testament: "New Testament" },
  { id: "3", name: "Romans", testament: "New Testament" },
  { id: "4", name: "Genesis", testament: "Old Testament" },
  { id: "5", name: "Matthew", testament: "New Testament" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const onChangeSearch = (query: string) => setSearchQuery(query)

  const verseOfTheDay = {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Daily Word
        </Text>
        <Searchbar
          placeholder="Search Bible"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <Card style={styles.verseCard}>
        <Card.Content>
          <Text variant="bodyLarge" style={styles.verseText}>
            "{verseOfTheDay.text}"
          </Text>
          <Text variant="bodyMedium" style={styles.verseReference}>
            {verseOfTheDay.reference}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => {}} icon="share-variant">
            Share
          </Button>
          <Button onPress={() => {}} icon="bookmark-outline">
            Save
          </Button>
        </Card.Actions>
      </Card>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Continue Reading
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScrollView}>
        {recentReadings.map((reading) => (
          <Link key={reading.id} href={`/bible/${reading.book}/${reading.chapter}`} asChild>
            <Card style={styles.recentCard}>
              <Card.Content>
                <Text variant="titleMedium">{reading.book}</Text>
                <Text variant="bodyMedium">Chapter {reading.chapter}</Text>
                <Text variant="bodySmall">Verse {reading.verse}</Text>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </ScrollView>

      <Text variant="titleLarge" style={styles.sectionTitle}>
        Bible Books
      </Text>
      <List.Section>
        {popularBooks.map((book) => (
          <Link key={book.id} href={`/bible/${book.name}/1`} asChild>
            <List.Item
              title={book.name}
              description={book.testament}
              left={(props) => <List.Icon {...props} icon="book" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </Link>
        ))}
      </List.Section>

      <View style={styles.buttonContainer}>
        <Link href="/bible" asChild>
          <Button mode="contained" style={styles.browseButton} icon="book-open-variant">
            Browse All Books
          </Button>
        </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#3f51b5",
  },
  title: {
    color: "white",
    marginBottom: 16,
    fontFamily: "Roboto-Bold",
  },
  searchBar: {
    marginBottom: 8,
  },
  verseCard: {
    margin: 16,
    elevation: 4,
  },
  verseText: {
    fontStyle: "italic",
    marginBottom: 8,
    lineHeight: 24,
  },
  verseReference: {
    textAlign: "right",
    fontWeight: "bold",
  },
  sectionTitle: {
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
  },
  recentScrollView: {
    paddingLeft: 16,
  },
  recentCard: {
    width: 160,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
  browseButton: {
    paddingVertical: 8,
  },
})

