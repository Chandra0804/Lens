import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SCREEN_WIDTH = Dimensions.get("window").width;

export function HomeScreen({ navigation, user }: HomeScreenProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarOffset = useState(new Animated.Value(-SCREEN_WIDTH))[0];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("NEET PG - Edition 8");

  const courses = ["NEET PG", "INICET"];

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
    setIsDropdownVisible(false);
  };

  const toggleSidebar = () => {
    const toValue = sidebarVisible ? -SCREEN_WIDTH : 0;
    Animated.timing(sidebarOffset, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarVisible(!sidebarVisible);
  };

  const Overlay = () =>
    sidebarVisible ? (
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={toggleSidebar}
      />
    ) : null;

  const SidebarContent = () => (
    <>
      <View style={styles.sidebarHeader}>
        <View style={styles.profileSection}>
          <Icon name="account-circle" size={50} color="#0E7490" />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>Name: {user?.username}</Text>
            <Text style={styles.role}>Doctor</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog" size={20} color="#0E7490" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.courseSection}>
        <Text style={styles.courseLabel}>Your Course</Text>
        <TouchableOpacity style={styles.courseInfo} onPress={toggleDropdown}>
          <Text style={styles.courseText}>Currently: {selectedCourse}</Text>
          <Icon
            name={isDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="#0E7490"
          />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={courses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectCourse(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <ScrollView style={styles.menuItems}>
        {[
          { label: "Buy Plan", icon: "shopping" },
          { label: "FAQ", icon: "frequently-asked-questions" },
          { label: "Contact us", icon: "contact-mail" },
          { label: "Rate us", icon: "star" },
          { label: "T&C", icon: "file-document" },
          { label: "Share the app", icon: "share-variant" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.statusBarSpacer} />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={toggleSidebar}
            style={styles.menuButton}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Icon name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Lens</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Modules */}
        <ScrollView contentContainerStyle={styles.modulesContainer}>
          {[
            {
              name: "Anatomy",
              icon: "human",
              progress: "0/63 modules",
            },
            {
              name: "Physiology",
              icon: "heart-pulse",
              progress: "0/28 modules",
            },
            { name: "Biochemistry", icon: "flask", progress: "0/43 modules" },
            { name: "Pathology", icon: "microscope", progress: "0/67 modules" },
            { name: "Pharmacology", icon: "pill", progress: "0/71 modules" },
            {
              name: "Microbiology",
              icon: "bacteria",
              progress: "0/38 modules",
            },
            {
              name: "Forensic Medicine",
              icon: "police-badge",
              progress: "0/23 modules",
            },
            { name: "ENT", icon: "ear-hearing", progress: "0/54 modules" },
            { name: "Ophthalmology", icon: "eye", progress: "0/54 modules" },
            {
              name: "Community Medicine",
              icon: "account-group",
              progress: "0/54 modules",
            },
            {
              name: "General Medicine",
              icon: "stethoscope",
              progress: "0/54 modules",
            },
            {
              name: "General Surgery",
              icon: "hospital",
              progress: "0/54 modules",
            },
            {
              name: "Obstetrics & Gynecology",
              icon: "baby-bottle-outline",
              progress: "0/54 modules",
            },
            { name: "Pediatrics", icon: "baby-face", progress: "0/54 modules" },
            { name: "Psychiatry", icon: "brain", progress: "0/54 modules" },
            { name: "Orthopedics", icon: "bone", progress: "0/54 modules" },
            { name: "Dermatology", icon: "face-man", progress: "0/54 modules" },
            {
              name: "Anesthesiology",
              icon: "needle",
              progress: "0/54 modules",
            },
            { name: "Radiology", icon: "camera-outline", progress: "0/54 modules" },
          ].map((module, index) => (
            <Pressable
              style={styles.card}
              key={index}
              onPress={() => {
                navigation.navigate("Test", {
                  title: "Medical Basics",
                  testName: "flags",
                });
              }}
            >
              <Icon name={module.icon} size={24} color="#3B82F6" />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{module.name}</Text>
                <Text style={styles.cardProgress}>{module.progress}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {[
            { name: "QBank", icon: "book-outline" },
            { name: "Tests", icon: "file-document-outline" },
            { name: "PDFs", icon: "file-pdf-box" },
          ].map((item, index) => (
            <TouchableOpacity style={styles.footerItem} key={index}>
              <Icon name={item.icon} size={24} color="#3B82F6" />
              <Text style={styles.footerText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Overlay />

      {/* Sidebar */}
      <Animated.View
        style={[styles.sidebar, { transform: [{ translateX: sidebarOffset }] }]}
      >
        <View style={styles.statusBarSpacer} />
        <SidebarContent />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F6FE",
  },
  statusBarSpacer: {
    height: Platform.OS === "ios" ? 50 : StatusBar.currentHeight,
    backgroundColor: "#93e3fd",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  sidebar: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.85,
    height: "100%",
    backgroundColor: "#93e3fd",
    zIndex: 2,
  },
  sidebarHeader: {
    padding: 20,
    paddingBottom: 15,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileInfo: {
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0E7490",
  },
  role: {
    fontSize: 14,
    color: "#0E7490",
    opacity: 0.9,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  settingsText: {
    color: "#0E7490",
    marginLeft: 8,
    fontSize: 14,
  },
  courseSection: {
    padding: 20,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  courseLabel: {
    fontSize: 14,
    color: "#0E7490",
    opacity: 0.9,
  },
  courseInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  courseText: {
    fontSize: 15,
    color: "#0E7490",
    fontWeight: "500",
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: "#93e3fd",
    borderRadius: 8,
    padding: 10,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#0E7490",
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  menuItemText: {
    color: "#0E7490",
    fontSize: 15,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#E5F6FE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#93e3fd",
    padding: 16,
    paddingVertical: 2,
  },
  menuButton: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0E7490",
    left: -10,
  },
  placeholder: {
    width: 24,
    height: 24,
  },
  modulesContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  cardProgress: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#93e3fd",
    padding: 10,
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#0E7490",
    marginTop: 4,
  },
});
