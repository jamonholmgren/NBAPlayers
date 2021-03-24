import React, { useEffect } from "react"
import { Image, FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const PlayerListScreen = observer(function PlayerListScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { playerStore } = useStores()
  const { players } = playerStore

  useEffect(() => {
    async function fetchData() {
      await playerStore.getPlayers()
    }

    fetchData()
  }, [])

  return (
    <View testID="PlayerListScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="playerListScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <FlatList
          contentContainerStyle={FLAT_LIST}
          data={players}
          keyExtractor={(item) => String(item.name)}
          renderItem={({ item }) => (
            <View style={LIST_CONTAINER}>
              <Image source={{ uri: item.imgURL }} style={IMAGE} />
              <Text style={LIST_TEXT}>{item.name}</Text>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
