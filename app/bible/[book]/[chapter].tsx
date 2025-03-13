"use client"

import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text, Appbar, Divider, Button, IconButton, Menu } from "react-native-paper";
import { useState } from "react";
import bibleData from "../data/obadiah.json"; // Assume this file contains the JSON data

const getBibleContent = (book, chapter) => {
  if (!bibleData || !bibleData.content || !bibleData.content.sections) return [];

  const sections = bibleData.content.sections.filter(section =>
    section.chapters.some(ch => ch.chapter === chapter)
  );

  return sections.map(section => ({
    title: section.title,
    verses: section.chapters.find(ch => ch.chapter === chapter)?.verses || []
  }));
};

export default function BiblePage() {
  const { book, chapter } = useLocalSearchParams();
  const router = useRouter();
  const [fontSize, setFontSize] = useState(16);
  const [menuVisible, setMenuVisible] = useState(false);

  const bookName = typeof book === "string" ? book : "Genesis";
  const chapterNum = typeof chapter === "string" ? Number.parseInt(chapter, 10) : 1;

  const sections = getBibleContent(bookName, chapterNum);

  const navigateToChapter = (offset) => {
    const newChapter = chapterNum + offset;
    if (newChapter > 0) {
      router.push(`/bible/${bookName}/${newChapter}`);
    }
  };

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
          {sections.map((section, index) => (
            <View key={index}>
              <Text variant="headlineMedium" style={styles.sectionTitle}>{section.title}</Text>
              <Divider style={styles.divider} />
              {section.verses.map((verse) => (
                <View key={verse.verse} style={styles.verseContainer}>
                  <Text style={[styles.verseNumber, { fontSize }]}>{verse.verse}</Text>
                  <Text style={[styles.verseText, { fontSize }]}>{verse.text}</Text>
                </View>
              ))}
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
  );
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
  sectionTitle: {
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
});
