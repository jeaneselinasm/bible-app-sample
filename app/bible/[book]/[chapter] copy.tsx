"use client"

import { useLocalSearchParams, useRouter } from "expo-router"
import { StyleSheet, View, ScrollView } from "react-native"
import { Text, Appbar, Divider, Button, IconButton, Menu } from "react-native-paper"
import { useState } from "react"
import bibleData from '../data/obadiah.json'; // Assume this file contains the JSON data
// Mock Bible data - in a real app, you would fetch this from an API
// const getBibleContent = (book: string, chapter: number) => {
//   // This is just mock data
//   if (book === "John" && chapter === 3) {
//     return [
//       {
//         verse: 1,
//         text: "Now there was a Pharisee, a man named Nicodemus who was a member of the Jewish ruling council.",
//       },
//       {
//         verse: 2,
//         text: 'He came to Jesus at night and said, "Rabbi, we know that you are a teacher who has come from God. For no one could perform the signs you are doing if God were not with him."',
//       },
//       {
//         verse: 3,
//         text: 'Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again."',
//       },
//       {
//         verse: 4,
//         text: 'How can someone be born when they are old?" Nicodemus asked. "Surely they cannot enter a second time into their mother\'s womb to be born!"',
//       },
//       {
//         verse: 5,
//         text: 'Jesus answered, "Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit."',
//       },
//       {
//         verse: 16,
//         text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
//       },
//       {
//         verse: 17,
//         text: "For God did not send his Son into the world to condemn the world, but to save the world through him.",
//       },
//     ]
//   } else if (book === "Psalms" && chapter === 23) {
//     return [
//       { verse: 1, text: "The LORD is my shepherd, I lack nothing." },
//       { verse: 2, text: "He makes me lie down in green pastures, he leads me beside quiet waters," },
//       { verse: 3, text: "he refreshes my soul. He guides me along the right paths for his name's sake." },
//       {
//         verse: 4,
//         text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
//       },
//       {
//         verse: 5,
//         text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.",
//       },
//       {
//         verse: 6,
//         text: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.",
//       },
//     ]
//   } else {
//     // Default placeholder content
//     return Array.from({ length: 10 }, (_, i) => ({
//       verse: i + 1,
//       text: `This is verse ${i + 1} of ${book} chapter ${chapter}. In a real app, this would contain the actual Bible text.`,
//     }))
//   }
// }

const getBibleContent = (book:string, chapter:string) => {
    const bookData = bibleData.content.sections.find(section => section.chapters.some(ch => ch.chapter === chapter));
    if (!bookData) return [];
  
    const chapterData = bookData.chapters.find(ch => ch.chapter === chapter);
    if (!chapterData) return [];
  
    return chapterData.verses;
  };
export default function BiblePage() {
  const { book, chapter } = useLocalSearchParams()
  const router = useRouter()
  const [fontSize, setFontSize] = useState(16)
  const [menuVisible, setMenuVisible] = useState(false)

  const bookName = typeof book === "string" ? book : "Genesis"
  const chapterNum = typeof chapter === "string" ? Number.parseInt(chapter, 10) : 1

  const verses = getBibleContent(bookName, chapterNum)

  const navigateToChapter = (offset: number) => {
    const newChapter = chapterNum + offset
    if (newChapter > 0) {
      router.push(`/bible/${bookName}/${newChapter}`)
    }
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={`${bookName} ${chapterNum}`} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} />}
        >
          <Menu.Item
            onPress={() => setFontSize(fontSize + 2)}
            title="Increase Font Size"
            leadingIcon="format-font-size-increase"
          />
          <Menu.Item
            onPress={() => setFontSize(Math.max(12, fontSize - 2))}
            title="Decrease Font Size"
            leadingIcon="format-font-size-decrease"
          />
          <Divider />
          <Menu.Item onPress={() => {}} title="Share" leadingIcon="share-variant" />
          <Menu.Item onPress={() => {}} title="Add Bookmark" leadingIcon="bookmark-outline" />
        </Menu>
      </Appbar.Header>

      <ScrollView style={styles.scrollView}>
        <View style={styles.chapterContainer}>
          <Text variant="headlineMedium" style={styles.chapterTitle}>
            {bookName} - Pasal {chapterNum}
          </Text>
          <Text variant="headlineMedium" style={styles.chapterTitle}>
            {bookName} - Pasal {chapterNum}
          </Text>

          <Divider style={styles.divider} />

          {verses.map((verse) => (
            <View key={verse.verse} style={styles.verseContainer}>
              <Text style={[styles.verseNumber, { fontSize }]}>{verse.verse}</Text>
              <Text style={[styles.verseText, { fontSize }]}>{verse.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.navigationBar}>
        <Button mode="outlined" onPress={() => navigateToChapter(-1)} disabled={chapterNum <= 1} icon="chevron-left">
          Previous
        </Button>

        <IconButton icon="bookmark-outline" size={24} onPress={() => {}} />

        <IconButton icon="share-variant" size={24} onPress={() => {}} />

        <Button
          mode="outlined"
          onPress={() => navigateToChapter(1)}
          icon={{ source: "chevron-right", direction: "rtl" }}
        >
          Next
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  chapterContainer: {
    padding: 16,
  },
  chapterTitle: {
    textAlign: "center",
    marginVertical: 16,
    fontFamily: "Roboto-Medium",
  },
  divider: {
    marginBottom: 16,
  },
  verseContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  verseNumber: {
    fontWeight: "bold",
    marginRight: 8,
    color: "#3f51b5",
    minWidth: 24,
  },
  verseText: {
    flex: 1,
    lineHeight: 24,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "white",
  },
})

