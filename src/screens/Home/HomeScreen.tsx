import React, { useState, useEffect } from "react";
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
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';

export interface UserType {
  _id?: string;
  username?: string;
  role?: string;
  isSubscribed?: boolean;
}

interface RecentlyViewedItem {
  name: string;
  icon: string;
  testName: string;
}

interface RecommendationItem {
  name: string;
  subtopic: string;
  difficulty: string;
}

interface Module {
     name: string;
     icon: string;
	 progress?: string;
	 testName?: string;
}

interface SubjectProgress {
  completed: number;
  total: number;
}

export interface UserProgress {
  [subject: string]: SubjectProgress;
}

interface HomeScreenProps {
  navigation: StackNavigationProp<any, any>;
  user: UserType;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export function HomeScreen({ navigation, user }: HomeScreenProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarOffset = useState(new Animated.Value(-SCREEN_WIDTH))[0];
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("NEET PG - Edition 8");
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);

  const courses = ["NEET PG", "INICET"];

  // Load user data on mount
  useEffect(() => {
    loadUserData();
    // If we had a server fetching actual progress data, we would use it here
    if (user?._id) {
      fetchUserProgress(user._id);
    }
  }, [user]);
  
  const loadUserData = async () => {
    try {
      // Load recent views
      const recent = await AsyncStorage.getItem('recentlyViewed');
      if (recent) {
        setRecentlyViewed(JSON.parse(recent));
      }
      
      // Load mock progress data
      setUserProgress({
        "anatomy": { completed: 5, total: 63 },
        "physiology": { completed: 3, total: 28 },
        "biochemistry": { completed: 2, total: 43 },
        "pathology": { completed: 0, total: 67 },
        "pharmacology": { completed: 4, total: 71 },
      });
      
      // Set some recommendations based on progress
      setRecommendations([
        { name: "Anatomy", subtopic: "Upper Limb", difficulty: "medium" },
        { name: "Pharmacology", subtopic: "Cardiovascular", difficulty: "easy" },
        { name: "Physiology", subtopic: "Respiratory", difficulty: "hard" },
      ]);
      
      // Check subscription status
      if (user?.isSubscribed) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };
  
  const fetchUserProgress = async (userId: string) => {
    try {
      const response = await fetch(`https://lens-67p4.onrender.com/api/progress/${userId}`);
      if (response.ok) {
        const data: Array<{
          subject: string;
          completedModules: number;
          totalModules: number;
        }> = await response.json();
        
        // Process progress data from server
        const progressMap: UserProgress = {};
        data.forEach(item => {
          progressMap[item.subject] = {
            completed: item.completedModules,
            total: item.totalModules,
          };
        });
        
        setUserProgress({...userProgress, ...progressMap});
      }
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectCourse = (course: string) => {
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
  
  const handleModulePress = (module: Module) => {
    // Convert module name to camelCase for testName
    const testName = module.name.toLowerCase().replace(/\s+/g, '');
    
    // Save to recently viewed
    const updatedRecent = [
      { name: module.name, icon: module.icon, testName },
      ...recentlyViewed.filter(item => item.name !== module.name)
    ].slice(0, 5);  // Keep only 5 most recent
    
    setRecentlyViewed(updatedRecent);
    AsyncStorage.setItem('recentlyViewed', JSON.stringify(updatedRecent));
    
    // Navigate to test screen
    navigation.navigate("Test", {
      title: module.name,
      testName,
      subject: module.name.toLowerCase(),
      userId: user?._id,
    });
  };
  
  const handleSubscription = () => {
    if (!user) {
      Alert.alert(
        "Login Required",
        "Please login to subscribe to premium content.",
        [{ text: "OK" }]
      );
      return;
    }
    
    Alert.alert(
      "Subscription Plans",
      "Choose a subscription plan:",
      [
        { 
          text: "Basic (₹499/month)", 
          onPress: () => purchaseSubscription("basic") 
        },
        { 
          text: "Premium (₹999/month)", 
          onPress: () => purchaseSubscription("premium") 
        },
        { 
          text: "Cancel", 
          style: "cancel" 
        }
      ]
    );
  };
  
  const purchaseSubscription = (plan: string) => {
    // In a real app, this would handle payment processing
    Alert.alert(
      "Subscription Successful",
      `You are now subscribed to the ${plan} plan!`,
      [{ text: "OK" }]
    );
    
    // Update user subscription status
    setIsSubscribed(true);
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
            <Text style={styles.username}>{user?.username || "Guest"}</Text>
            <Text style={styles.role}>{user?.role || "Student"}</Text>
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
          { 
            label: isSubscribed ? "Manage Plan" : "Buy Plan", 
            icon: "shopping", 
            onPress: handleSubscription 
          },
          { 
            label: "My Bookmarks", 
            icon: "bookmark-outline",
            onPress: () => navigation.navigate("Bookmarks") 
          },
          { 
            label: "Performance", 
            icon: "chart-line",
            onPress: () => navigation.navigate("Performance") 
          },
          { 
            label: "FAQ", 
            icon: "frequently-asked-questions" 
          },
          { 
            label: "Contact us", 
            icon: "contact-mail" 
          },
          { 
            label: "Rate us", 
            icon: "star" 
          },
          { 
            label: "About", 
            icon: "information-outline" 
          },
          { 
            label: "Logout", 
            icon: "logout",
            onPress: () => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  { text: "Cancel", style: "cancel" },
                  { 
                    text: "Logout", 
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                      });
                    }
                  }
                ]
              );
            }
          },
        ].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Icon name={item.icon} size={20} color="#0E7490" />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const medicalModules = [
    {
      name: "Anatomy",
      icon: "human",
      progress: userProgress["anatomy"] 
        ? `${userProgress["anatomy"].completed}/${userProgress["anatomy"].total} modules` 
        : "0/63 modules",
    },
    {
      name: "Physiology",
      icon: "heart-pulse",
      progress: userProgress["physiology"] 
        ? `${userProgress["physiology"].completed}/${userProgress["physiology"].total} modules` 
        : "0/28 modules",
    },
    { 
      name: "Biochemistry", 
      icon: "flask", 
      progress: userProgress["biochemistry"] 
        ? `${userProgress["biochemistry"].completed}/${userProgress["biochemistry"].total} modules` 
        : "0/43 modules" 
    },
    { 
      name: "Pathology", 
      icon: "microscope", 
      progress: userProgress["pathology"] 
        ? `${userProgress["pathology"].completed}/${userProgress["pathology"].total} modules` 
        : "0/67 modules" 
    },
    { 
      name: "Pharmacology", 
      icon: "pill", 
      progress: userProgress["pharmacology"] 
        ? `${userProgress["pharmacology"].completed}/${userProgress["pharmacology"].total} modules` 
        : "0/71 modules" 
    },
    { name: "Microbiology", icon: "bacteria", progress: "0/38 modules" },
    { name: "Forensic Medicine", icon: "police-badge", progress: "0/23 modules" },
    { name: "ENT", icon: "ear-hearing", progress: "0/54 modules" },
    { name: "Ophthalmology", icon: "eye", progress: "0/54 modules" },
    { name: "Community Medicine", icon: "account-group", progress: "0/54 modules" },
    { name: "General Medicine", icon: "stethoscope", progress: "0/54 modules" },
    { name: "General Surgery", icon: "hospital", progress: "0/54 modules" },
    { name: "Obstetrics & Gynecology", icon: "baby-bottle-outline", progress: "0/54 modules" },
    { name: "Pediatrics", icon: "baby-face", progress: "0/54 modules" },
    { name: "Psychiatry", icon: "brain", progress: "0/54 modules" },
    { name: "Orthopedics", icon: "bone", progress: "0/54 modules" },
    { name: "Dermatology", icon: "face-man", progress: "0/54 modules" },
    { name: "Anesthesiology", icon: "needle", progress: "0/54 modules" },
    { name: "Radiology", icon: "camera-outline", progress: "0/54 modules" },
  ];

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
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        
        {/* Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Welcome Banner */}
          <View style={styles.welcomeBanner}>
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>
                Hello, {user?.username ? user.username.split(' ')[0] : 'There'}!
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Continue your NEET PG preparation
              </Text>
              {!isSubscribed && (
                <TouchableOpacity 
                  style={styles.upgradeButton}
                  onPress={handleSubscription}
                >
                  <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.welcomeImageContainer}>
              <Image 
                source={require('../../../assets/lens_logo.png')} 
                style={styles.welcomeImage}
                resizeMode="contain"
              />
            </View>
          </View>
          
          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Viewed</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.recentContainer}>
                  {recentlyViewed.map((item, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.recentCard}
                      onPress={() => handleModulePress(item as Module)}
                    >
                      <Icon name={item.icon} size={28} color="#0E7490" />
                      <Text style={styles.recentCardText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          
          {/* Recommendations */}
          {recommendations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.recommendationsContainer}>
                  {recommendations.map((item, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={styles.recommendationCard}
                      onPress={() => navigation.navigate("Test", {
                        title: item.name,
                        testName: item.name.toLowerCase(),
                        subject: item.name.toLowerCase(),
                        moduleId: item.subtopic.toLowerCase(),
                        difficulty: item.difficulty,
                        userId: user?._id,
                      })}
                    >
                      <View style={styles.recommendationHeader}>
                        <Text style={styles.recommendationTitle}>{item.name}</Text>
                        <View style={[
                          styles.difficultyBadge,
                          item.difficulty === 'easy' ? styles.easyBadge : 
                          item.difficulty === 'medium' ? styles.mediumBadge : 
                          styles.hardBadge
                        ]}>
                          <Text style={styles.difficultyText}>
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.recommendationSubtitle}>{item.subtopic}</Text>
                      <Text style={styles.recommendationAction}>Start Quiz</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
          
          {/* All Subjects */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Subjects</Text>
            <View style={styles.modulesContainer}>
              {medicalModules.map((module, index) => (
                <Pressable
                  style={styles.card}
                  key={index}
                  onPress={() => handleModulePress(module as Module)}
                >
                  <Icon name={module.icon} size={24} color="#0E7490" />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{module.name}</Text>
                    <Text style={styles.cardProgress}>{module.progress}</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color="#9CA3AF" />
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          {[
            { 
              name: "Home", 
              icon: "home",
              isActive: true,
              onPress: () => {} 
            },
            { 
              name: "QBank", 
              icon: "book-outline",
              isActive: false,
              onPress: () => Alert.alert("Question Bank", "Access thousands of practice questions") 
            },
            { 
              name: "Tests", 
              icon: "file-document-outline",
              isActive: false,
              onPress: () => Alert.alert("Mock Tests", "Take full-length practice exams") 
            },
            { 
              name: "Notes", 
              icon: "note-text-outline",
              isActive: false,
              onPress: () => Alert.alert("Notes", "Access your saved notes") 
            },
          ].map((item, index) => (
            <TouchableOpacity 
              style={[styles.footerItem, item.isActive && styles.footerItemActive]} 
              key={index}
              onPress={item.onPress}
            >
              <Icon 
                name={item.icon} 
                size={24} 
                color={item.isActive ? "#0E7490" : "#64748B"} 
              />
              <Text 
                style={[
                  styles.footerText, 
                  item.isActive && styles.footerTextActive
                ]}
              >
                {item.name}
              </Text>
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
    backgroundColor: "#F0FAFF",
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
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  menuItemText: {
    color: "#0E7490",
    fontSize: 15,
    marginLeft: 12,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#F0FAFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#93e3fd",
    padding: 16,
    paddingVertical: 8,
  },
  menuButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0E7490",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  welcomeBanner: {
    backgroundColor: "#0E7490",
    flexDirection: "row",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: 16,
  },
  welcomeTextContainer: {
    flex: 2,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    marginTop: 4,
  },
  upgradeButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  upgradeButtonText: {
    color: "#0E7490",
    fontWeight: "600",
    fontSize: 13,
  },
  welcomeImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeImage: {
    width: 80,
    height: 80,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0E7490",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  recentContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recentCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recentCardText: {
    color: "#0E7490",
    fontWeight: "500",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  recommendationsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  recommendationCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recommendationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E7490",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: "#D1FAE5",
  },
  mediumBadge: {
    backgroundColor: "#FEF3C7",
  },
  hardBadge: {
    backgroundColor: "#FEE2E2",
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "600",
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 12,
  },
  recommendationAction: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0E7490",
  },
  modulesContainer: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E7490",
  },
  cardProgress: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  footerItem: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  footerItemActive: {
    borderTopWidth: 2,
    borderTopColor: "#0E7490",
    paddingTop: 4,
    marginTop: -6,
  },
  footerText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  footerTextActive: {
    color: "#0E7490",
    fontWeight: "500",
  },
});
