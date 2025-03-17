import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors } from "@//shared/colors";
import { font } from "@//shared/fonts";

const SimpleBookingProgressBar = ({ currentStep = 0 }) => {
  // Define your four steps.
  const steps = [
    { label: "Form e iscrizione" },
    { label: "Attendi risposta" },
    { label: "Contatta gli admin" },
    { label: "Creazione Squadra" },
    { label: "Attendi l'inzio" },
  ];
  const totalSteps = steps.length;
  // Set container width to 90% of the screen width.
  const containerWidth = Dimensions.get("window").width * 0.9;
  // Calculate spacing between circles.
  const circleSpacing = containerWidth / (totalSteps - 1);
  // The filled portion width is proportional to the current step.
  const progressWidth = currentStep * circleSpacing;
  // Define circle and bar dimensions.
  const circleDiameter = 30;
  const barHeight = 10;
  // The bar's top offset to align its center with the circles.
  const barTopOffset = (circleDiameter - barHeight) / 2;

  return (
    <View style={styles.container}>
      {/* Bar positioned behind the circles */}
      <View
        style={[
          styles.barContainer,
          { width: containerWidth, height: barHeight, top: barTopOffset },
        ]}
      >
        <View style={styles.baseBar} />
        <View style={[styles.filledBar, { width: progressWidth }]} />
      </View>
      {/* Circles and labels */}
      <View style={[styles.circlesContainer, { width: containerWidth }]}>
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          return (
            <View key={index} style={styles.circleWrapper}>
              <View style={[styles.circle, isActive && styles.circleActive]}>
                <Text
                  style={[
                    styles.circleText,
                    isActive && styles.circleTextActive,
                  ]}
                >
                  {index + 1}
                </Text>
              </View>
              <Text style={styles.label}>{step.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },
  barContainer: {
    position: "absolute",
    backgroundColor: colors.bg,
    borderRadius: 5,
    overflow: "hidden",
  },
  baseBar: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  filledBar: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  circlesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  circleWrapper: {
    alignItems: "center",
    width: 50,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  circleActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  circleText: {
    fontSize: 16,
    fontFamily: font.bold,
    color: colors.bg,
  },
  circleTextActive: {
    color: colors.primary,
  },
  label: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: font.regular,
    color: colors.bg,
    textAlign: "center",
  },
});

export default SimpleBookingProgressBar;
