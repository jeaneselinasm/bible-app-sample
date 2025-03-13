"use client"

import { StyleSheet, View, ScrollView } from "react-native"
import { Text, List, Divider, Searchbar } from "react-native-paper"
import { Link } from "expo-router"
import { useState } from "react"

// Mock Bible books data
const bibleBooks = [
    // Old Testament
    { id: "1", name: "Genesis", testament: "Old Testament", chapters: 50 },
    { id: "2", name: "Exodus", testament: "Old Testament", chapters: 40 },
    { id: "3", name: "Leviticus", testament: "Old Testament", chapters: 27 },
    { id: "4", name: "Numbers", testament: "Old Testament", chapters: 36 },
    { id: "5", name: "Deuteronomy", testament: "Old Testament", chapters: 34 },
    { id: "6", name: "Joshua", testament: "Old Testament", chapters: 24 },
    { id: "7", name: "Judges", testament: "Old Testament", chapters: 21 },
    { id: "8", name: "Ruth", testament: "Old Testament", chapters: 4 },
    { id: "9", name: "1 Samuel", testament: "Old Testament", chapters: 31 },
    { id: "10", name: "2 Samuel", testament: "Old Testament", chapters: 24 },
    { id: "11", name: "1 Kings", testament: "Old Testament", chapters: 22 },
    { id: "12", name: "2 Kings", testament: "Old Testament", chapters: 25 },
    { id: "13", name: "1 Chronicles", testament: "Old Testament", chapters: 29 },
    { id: "14", name: "2 Chronicles", testament: "Old Testament", chapters: 36 },
    { id: "15", name: "Ezra", testament: "Old Testament", chapters: 10 },
    { id: "16", name: "Nehemiah", testament: "Old Testament", chapters: 13 },
    { id: "17", name: "Esther", testament: "Old Testament", chapters: 10 },
    { id: "18", name: "Job", testament: "Old Testament", chapters: 42 },
    { id: "19", name: "Psalms", testament: "Old Testament", chapters: 150 },
    { id: "20", name: "Proverbs", testament: "Old Testament", chapters: 31 },
    { id: "21", name: "Ecclesiastes", testament: "Old Testament", chapters: 12 },
    { id: "22", name: "Song of Solomon", testament: "Old Testament", chapters: 8 },
    { id: "23", name: "Isaiah", testament: "Old Testament", chapters: 66 },
    { id: "24", name: "Jeremiah", testament: "Old Testament", chapters: 52 },
    { id: "25", name: "Lamentations", testament: "Old Testament", chapters: 5 },
    { id: "26", name: "Ezekiel", testament: "Old Testament", chapters: 48 },
    { id: "27", name: "Daniel", testament: "Old Testament", chapters: 12 },
    { id: "28", name: "Hosea", testament: "Old Testament", chapters: 14 },
    { id: "29", name: "Joel", testament: "Old Testament", chapters: 3 },
    { id: "30", name: "Amos", testament: "Old Testament", chapters: 9 },
    { id: "31", name: "Obadiah", testament: "Old Testament", chapters: 1 },
    { id: "32", name: "Jonah", testament: "Old Testament", chapters: 4 },
    { id: "33", name: "Micah", testament: "Old Testament", chapters: 7 },
    { id: "34", name: "Nahum", testament: "Old Testament", chapters: 3 },
    { id: "35", name: "Habakkuk", testament: "Old Testament", chapters: 3 },
    { id: "36", name: "Zephaniah", testament: "Old Testament", chapters: 3 },
    { id: "37", name: "Haggai", testament: "Old Testament", chapters: 2 },
    { id: "38", name: "Zechariah", testament: "Old Testament", chapters: 14 },
    { id: "39", name: "Malachi", testament: "Old Testament", chapters: 4 },
  
    // New Testament
    { id: "40", name: "Matthew", testament: "New Testament", chapters: 28 },
    { id: "41", name: "Mark", testament: "New Testament", chapters: 16 },
    { id: "42", name: "Luke", testament: "New Testament", chapters: 24 },
    { id: "43", name: "John", testament: "New Testament", chapters: 21 },
    { id: "44", name: "Acts", testament: "New Testament", chapters: 28 },
    { id: "45", name: "Romans", testament: "New Testament", chapters: 16 },
    { id: "46", name: "1 Corinthians", testament: "New Testament", chapters: 16 },
    { id: "47", name: "2 Corinthians", testament: "New Testament", chapters: 13 },
    { id: "48", name: "Galatians", testament: "New Testament", chapters: 6 },
    { id: "49", name: "Ephesians", testament: "New Testament", chapters: 6 },
    { id: "50", name: "Philippians", testament: "New Testament", chapters: 4 },
    { id: "51", name: "Colossians", testament: "New Testament", chapters: 4 },
    { id: "52", name: "1 Thessalonians", testament: "New Testament", chapters: 5 },
    { id: "53", name: "2 Thessalonians", testament: "New Testament", chapters: 3 },
    { id: "54", name: "1 Timothy", testament: "New Testament", chapters: 6 },
    { id: "55", name: "2 Timothy", testament: "New Testament", chapters: 4 },
    { id: "56", name: "Titus", testament: "New Testament", chapters: 3 },
    { id: "57", name: "Philemon", testament: "New Testament", chapters: 1 },
    { id: "58", name: "Hebrews", testament: "New Testament", chapters: 13 },
    { id: "59", name: "James", testament: "New Testament", chapters: 5 },
    { id: "60", name: "1 Peter", testament: "New Testament", chapters: 5 },
    { id: "61", name: "2 Peter", testament: "New Testament", chapters: 3 },
    { id: "62", name: "1 John", testament: "New Testament", chapters: 5 },
    { id: "63", name: "2 John", testament: "New Testament", chapters: 1 },
    { id: "64", name: "3 John", testament: "New Testament", chapters: 1 },
    { id: "65", name: "Jude", testament: "New Testament", chapters: 1 },
    { id: "66", name: "Revelation", testament: "New Testament", chapters: 22 },
  ];
  

export default function BibleBooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTestament, setActiveTestament] = useState("all")

  const onChangeSearch = (query: string) => setSearchQuery(query)

  const filteredBooks = bibleBooks.filter((book) => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTestament =
      activeTestament === "all" || book.testament.toLowerCase().includes(activeTestament.toLowerCase())
    return matchesSearch && matchesTestament
  })

  const oldTestamentBooks = filteredBooks.filter((book) => book.testament === "Old Testament")
  const newTestamentBooks = filteredBooks.filter((book) => book.testament === "New Testament")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Bible Books
        </Text>
        <Searchbar
          placeholder="Search books"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        <View style={styles.filterButtons}>
          <Text
            style={[styles.filterButton, activeTestament === "all" && styles.activeFilter]}
            onPress={() => setActiveTestament("all")}
          >
            All
          </Text>
          <Text
            style={[styles.filterButton, activeTestament === "old" && styles.activeFilter]}
            onPress={() => setActiveTestament("old")}
          >
            Old Testament
          </Text>
          <Text
            style={[styles.filterButton, activeTestament === "new" && styles.activeFilter]}
            onPress={() => setActiveTestament("new")}
          >
            New Testament
          </Text>
        </View>
      </View>

      <ScrollView>
        {(activeTestament === "all" || activeTestament === "old") && oldTestamentBooks.length > 0 && (
          <>
            <List.Subheader>Old Testament</List.Subheader>
            {oldTestamentBooks.map((book) => (
              <Link key={book.id} href={`/bible/${book.name}/1`} asChild>
                <List.Item
                  title={book.name}
                  description={`${book.chapters} chapters`}
                  left={(props) => <List.Icon {...props} icon="book" />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                />
              </Link>
            ))}
            <Divider />
          </>
        )}

        {(activeTestament === "all" || activeTestament === "new") && newTestamentBooks.length > 0 && (
          <>
            <List.Subheader>New Testament</List.Subheader>
            {newTestamentBooks.map((book) => (
              <Link key={book.id} href={`/bible/${book.name}/1`} asChild>
                <List.Item
                  title={book.name}
                  description={`${book.chapters} chapters`}
                  left={(props) => <List.Icon {...props} icon="book" />}
                  right={(props) => <List.Icon {...props} icon="chevron-right" />}
                />
              </Link>
            ))}
          </>
        )}

        {filteredBooks.length === 0 && (
          <View style={styles.noResults}>
            <Text>No books found matching "{searchQuery}"</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  activeFilter: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    fontWeight: "bold",
  },
  noResults: {
    padding: 24,
    alignItems: "center",
  },
})

