import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";

const QUICK_AMOUNTS = [25, 50, 100, 250, 500];

const PAYMENT_METHODS = [
  { id: "card", label: "Visa •••• 4242", subtitle: "Debit Card" },
  { id: "bank", label: "Chase Checking", subtitle: "•••• 8890" },
  { id: "apple", label: "Apple Pay", subtitle: "Instant" },
];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0]);
  const [sheetVisible, setSheetVisible] = useState(false);

  const numericAmount = parseFloat(amount) || 0;
  const isValid = numericAmount > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Add Funds</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Amount Card */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>Enter Amount</Text>
            <View style={styles.amountInputRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                maxLength={10}
              />
            </View>
            <Text style={styles.availableText}>
              Available balance: $12,480.50
            </Text>
          </View>

          {/* Quick Amounts */}
          <Text style={styles.sectionTitle}>Quick Amounts</Text>
          <View style={styles.quickAmountsRow}>
            {QUICK_AMOUNTS.map((value) => {
              const isActive = amount === String(value);
              return (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.quickAmountChip,
                    isActive && styles.quickAmountChipActive,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setAmount(String(value))}
                >
                  <Text
                    style={[
                      styles.quickAmountText,
                      isActive && styles.quickAmountTextActive,
                    ]}
                  >
                    ${value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payment Method */}
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity
            style={styles.paymentMethodCard}
            activeOpacity={0.7}
            onPress={() => setSheetVisible(true)}
          >
            <View style={styles.paymentMethodLeft}>
              <View style={styles.paymentMethodIcon}>
                <Text style={styles.paymentMethodIconText}>
                  {selectedMethod.label.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={styles.paymentMethodLabel}>
                  {selectedMethod.label}
                </Text>
                <Text style={styles.paymentMethodSubtitle}>
                  {selectedMethod.subtitle}
                </Text>
              </View>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>
                ${numericAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Fee</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                ${numericAmount.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={[
              styles.primaryButton,
              !isValid && styles.primaryButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!isValid}
            onPress={() => {
              // TODO: hook up to your API / mutation
              router.back();
            }}
          >
            <Text style={styles.primaryButtonText}>
              {isValid ? `Add $${numericAmount.toFixed(2)}` : "Enter an amount"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Funds are typically available within 1–2 business days.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Pure RN Bottom Sheet using Modal */}
      <Modal
        visible={sheetVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSheetVisible(false)}
      >
        <Pressable
          style={styles.sheetBackdrop}
          onPress={() => setSheetVisible(false)}
        />
        <View style={styles.sheetContainer}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Select Payment Method</Text>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod.id === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.sheetOption,
                  isSelected && styles.sheetOptionSelected,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedMethod(method);
                  setSheetVisible(false);
                }}
              >
                <View style={styles.paymentMethodLeft}>
                  <View style={styles.paymentMethodIcon}>
                    <Text style={styles.paymentMethodIconText}>
                      {method.label.charAt(0)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.paymentMethodLabel}>
                      {method.label}
                    </Text>
                    <Text style={styles.paymentMethodSubtitle}>
                      {method.subtitle}
                    </Text>
                  </View>
                </View>
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
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
    paddingTop: 8,
    paddingBottom: 32,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  backButtonText: {
    fontSize: 20,
    color: "#0F172A",
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.3,
  },
  amountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  amountLabel: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: "700",
    color: "#0F172A",
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "700",
    color: "#0F172A",
    padding: 0,
    letterSpacing: -0.5,
  },
  availableText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "400",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  quickAmountsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 28,
  },
  quickAmountChip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  quickAmountChipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  quickAmountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  quickAmountTextActive: {
    color: "#FFFFFF",
  },
  paymentMethodCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentMethodLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  paymentMethodIconText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },
  paymentMethodLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 2,
  },
  paymentMethodSubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "400",
  },
  chevron: {
    fontSize: 24,
    color: "#94A3B8",
    fontWeight: "400",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "600",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 6,
  },
  summaryTotalLabel: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "700",
  },
  summaryTotalValue: {
    fontSize: 16,
    color: "#2563EB",
    fontWeight: "700",
  },
  primaryButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disclaimer: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 16,
    fontWeight: "400",
  },

  /* Pure RN bottom sheet styles */
  sheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#CBD5E1",
    alignSelf: "center",
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },
  sheetOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 10,
  },
  sheetOptionSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  checkmark: {
    fontSize: 18,
    color: "#2563EB",
    fontWeight: "700",
  },
});