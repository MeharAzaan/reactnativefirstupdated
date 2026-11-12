import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Color, useRouter } from "expo-router";
import { Button  } from "react-native";
import { BottomSheet, Host } from "@expo/ui/swift-ui";
const STATS = [
  { label: "Total Balance", value: "$12,480.50", change: "+2.4%" },
  { label: "Income", value: "$4,250.00", change: "+8.1%" },
  { label: "Expenses", value: "$2,180.75", change: "-3.2%" },
];
const TRANSACTIONS = [
  {
    id: "1",
    title: "Grocery Store",
    category: "Shopping",
    amount: "-$84.20",
    date: "Today, 10:24 AM",
    positive: false,
  },
  {
    id: "2",
    title: "Salary Deposit",
    category: "Income",
    amount: "+$3,200.00",
    date: "Yesterday, 9:00 AM",
    positive: true,
  },
  {
    id: "3",
    title: "Coffee Shop",
    category: "Food & Drink",
    amount: "-$6.50",
    date: "Yesterday, 8:15 AM",
    positive: false,
  },
  {
    id: "4",
    title: "Streaming Subscription",
    category: "Entertainment",
    amount: "-$15.99",
    date: "Apr 12, 2025",
    positive: false,
  },
];

export default function DashboardScreen() {
  const router = useRouter();
const [isvisible , setisvisible]=useState(false);
  return (
   
    <SafeAreaView style={styles.container}>
         <Button title="bottom sheet " onPress={()=>{
            setisvisible(!isvisible)
         }}>
           
         </Button>
         <Host>
<BottomSheet
  isPresented={isvisible}
  onDismiss={() => setisvisible(false)}
 onIsPresentedChange={setisvisible}
>
  <View style={{ padding: 24 }}>
    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0F172A", marginBottom: 16 }}>
      Quick Actions
    </Text>

    <TouchableOpacity
      style={styles.sheetRow}
      activeOpacity={0.7}
      onPress={() => setisvisible(false)}
    >
      <Text style={styles.sheetRowText}>Send Money</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.sheetRow}
      activeOpacity={0.7}
      onPress={() => setisvisible(false)}
    >
      <Text style={styles.sheetRowText}>Request Money</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.sheetRow}
      activeOpacity={0.7}
      onPress={() => setisvisible(false)}
    >
      <Text style={styles.sheetRowText}>Pay a Bill</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.sheetRow}
      activeOpacity={0.7}
      onPress={() => setisvisible(false)}
    >
      <Text style={styles.sheetRowText}>Top Up</Text>
    </TouchableOpacity>
  </View>
</BottomSheet>
         </Host>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            activeOpacity={0.8}
            onPress={() => router.push("/(auth)/profile")}
          >
            <Text style={styles.avatarText}>JD</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>$12,480.50</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.balanceChange}>+2.4% this month</Text>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.8}
              onPress={() => {
                router.push("/(auth)/add_funds")
              }}
            >
              <Text style={styles.actionButtonText}>Add Funds</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsRow}>
          {STATS.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text
                style={[
                  styles.statChange,
                  stat.change.startsWith("-")
                    ? styles.negativeChange
                    : styles.positiveChange,
                ]}
              >
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

   
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsRow}>
          {["Send", "Request", "Pay", "Top Up"].map((action) => (
            <TouchableOpacity
              key={action}
              style={styles.quickAction}
              activeOpacity={0.8}
              onPress={() => {}}
            >
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionIconText}>
                  {action.charAt(0)}
                </Text>
              </View>
              <Text style={styles.quickActionLabel}>{action}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {TRANSACTIONS.map((tx) => (
            <TouchableOpacity
              key={tx.id}
              style={styles.transactionItem}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <View style={styles.transactionLeft}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionIconText}>
                    {tx.title.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.transactionTitle}>{tx.title}</Text>
                  <Text style={styles.transactionMeta}>
                    {tx.category} · {tx.date}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  tx.positive ? styles.positiveChange : styles.negativeChange,
                ]}
              >
                {tx.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  uppertext:{
color:"black"
  },
  balanceCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  balanceLabel: {
    color: "#BFDBFE",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  balanceValue: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 20,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceChange: {
    color: "#BFDBFE",
    fontSize: 13,
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "700",
    marginBottom: 4,
  },
  statChange: {
    fontSize: 11,
    fontWeight: "600",
  },
  positiveChange: {
    color: "#16A34A",
  },
  negativeChange: {
    color: "#DC2626",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  seeAllText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  quickAction: {
    alignItems: "center",
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIconText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563EB",
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#334155",
  },
  transactionsList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionIconText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 2,
  },
  transactionMeta: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "400",
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "700",
  },
  sheetRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 10,
  },
  sheetRowText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
});