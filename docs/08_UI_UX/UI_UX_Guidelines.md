# UI/UX Design System

---

# 1. Document Information

| Field | Details |
|--------|---------|
| Document Name | UI/UX Design System |
| Project Name | WakuLaw – Explainable AI Legal Intelligence Platform |
| Document ID | WK-DOC-008 |
| Version | 1.0 |
| Status | Draft |
| Prepared By | Team WakuLaw |
| Reviewed By | Sir Zahid Sarwar |
| Department | Software Engineering |
| Last Updated | 03 July 2026 |

---

# 2. Revision History

| Version | Date | Author | Description |
|----------|------------|--------------|----------------|
| 1.0 | 03 July 2026 | Team WakuLaw | Initial UI/UX Design System |

---

# 3. Table of Contents

1. Design Philosophy

2. Brand Identity

3. Color System

4. Typography

5. Spacing System

6. Design Principles

7. Component Library

8. Layout System

9. Responsive Design

10. Accessibility

---

# 4. Design Philosophy

WakuLaw is designed as a premium AI-powered Legal Intelligence Platform.

The interface should communicate:

- Professionalism
- Trust
- Precision
- Intelligence
- Simplicity
- Modern Luxury

Every screen should feel suitable for lawyers, judges, legal researchers, and enterprise clients.

The interface emphasizes readability, whitespace, subtle animations, and high-quality typography over excessive visual decoration.

---

# 5. Brand Identity

## Brand Personality

- Professional
- Elegant
- Intelligent
- Premium
- Reliable
- Minimal

---

## Design Style

Modern Enterprise SaaS

Luxury Legal Technology

Minimalistic Dashboard

Glassmorphism (Light Usage)

Rounded Interfaces

Subtle Shadows

Premium Cards

---

# 6. Color System

## Primary Colors

Primary Black

#0F0F0F

---

Secondary Black

#1B1B1B

---

Surface Black

#242424

---

Premium Gold

#D4AF37

---

Light Gold

#F3D27A

---

Pure White

#FFFFFF

---

Soft White

#F7F7F7

---

Gray

#A9A9A9

---

Error

#D9534F

---

Success

#28A745

---

Warning

#FFC107

---

Info

#0EA5E9

---

# 7. Color Usage

| Color | Purpose |
|--------|----------|
| Black | Background |
| Gold | Buttons, Highlights |
| White | Text |
| Gray | Secondary Text |
| Green | Success |
| Red | Errors |
| Blue | Information |

---

# End of Part 1
---

# 8. Typography System

Typography is designed to maximize readability while maintaining a premium enterprise appearance.

---

## Primary Font

Inter

Usage

- Headings
- Body Text
- Buttons
- Navigation
- Forms

---

## Secondary Font

Merriweather

Usage

- Legal Quotes
- Report Titles
- Hero Section Headlines

---

## Font Scale

| Element | Size | Weight |
|----------|------|---------|
| Hero Title | 56px | Bold |
| Page Title | 40px | Bold |
| Section Title | 32px | Semi Bold |
| Card Title | 24px | Semi Bold |
| Heading | 20px | Medium |
| Body | 16px | Regular |
| Small Text | 14px | Regular |
| Caption | 12px | Regular |

---

## Line Heights

Headings

120%

Body

160%

Captions

150%

---

# 9. Spacing System

The interface follows an 8-point spacing system.

| Token | Value |
|--------|------:|
| XS | 4px |
| SM | 8px |
| MD | 16px |
| LG | 24px |
| XL | 32px |
| XXL | 48px |
| XXXL | 64px |

This spacing system shall be used consistently across all screens.

---

# 10. Border Radius

| Component | Radius |
|------------|--------|
| Buttons | 12px |
| Cards | 18px |
| Dialogs | 20px |
| Inputs | 12px |
| Badges | 999px |
| Images | 16px |

Rounded corners contribute to the premium visual identity.

---

# 11. Shadows

Cards

```
0 12px 40px rgba(0,0,0,0.25)
```

Hover Cards

```
0 20px 60px rgba(0,0,0,0.35)
```

Buttons

```
0 6px 20px rgba(212,175,55,0.25)
```

Shadows should remain subtle and never overpower the interface.

---

# 12. Glassmorphism Guidelines

Glass effects shall be applied sparingly.

Recommended properties:

Background

```
rgba(255,255,255,0.06)
```

Blur

```
backdrop-filter: blur(20px);
```

Border

```
1px solid rgba(255,255,255,0.10)
```

Glass panels should primarily be used for:

- AI Dashboard Cards
- Statistics Widgets
- Modal Windows
- Floating Panels

---

# 13. Iconography

Recommended Icon Library

Lucide React

Icon Style

- Outline Icons
- Rounded Edges
- Minimal Design
- Consistent Stroke Width

Primary Icon Size

24px

Secondary Icon Size

20px

Small Icon Size

16px

---

# 14. Elevation Levels

| Level | Usage |
|---------|----------------|
| Level 0 | Background |
| Level 1 | Cards |
| Level 2 | Dialogs |
| Level 3 | Dropdowns |
| Level 4 | Floating Panels |
| Level 5 | Notifications |

Higher elevation indicates higher interaction priority.

---

# 15. Animation Guidelines

Animations shall be subtle and purposeful.

### Duration

Fast

150ms

Normal

250ms

Slow

350ms

---

### Easing

```
ease-in-out
```

---

### Animation Types

- Fade In
- Fade Out
- Scale
- Slide
- Card Hover
- Button Press
- Loading Skeleton
- Progress Animation

Animations should enhance usability without distracting users.

---

# End of Part 2
---

# 16. Component Library

The WakuLaw Design System consists of reusable UI components that ensure visual consistency throughout the application.

All components shall follow the established color palette, typography, spacing system, and accessibility guidelines.

---

# 16.1 Buttons

## Primary Button

Purpose

Primary actions.

Examples

- Login
- Generate Report
- Run AI Analysis
- Upload Case

Appearance

- Gold background
- Black text
- Rounded corners
- Premium shadow

Hover

- Slight brightness increase
- Smooth elevation animation

---

## Secondary Button

Purpose

Less important actions.

Appearance

- Transparent background
- Gold border
- Gold text

---

## Outline Button

Purpose

Alternative actions.

Appearance

- Transparent
- White border
- White text

---

## Danger Button

Purpose

Delete operations.

Appearance

- Red background
- White text

---

## Button Sizes

| Size | Height |
|-------|--------|
| Small | 36px |
| Medium | 44px |
| Large | 52px |

---

# 16.2 Input Fields

Supported Inputs

- Text
- Email
- Password
- Phone
- Search
- Number
- Date

Features

- Floating labels
- Rounded corners
- Gold focus border
- Error states
- Success states
- Helper text

---

# 16.3 Search Bar

Features

- Search icon
- Live filtering
- Clear button
- Keyboard shortcuts

Used in

- Cases
- Documents
- Reports
- AI Chat
- Dashboard

---

# 16.4 Cards

Card Types

### Information Card

Used for

- Statistics
- User information
- AI summaries

---

### Dashboard Card

Used for

- Analytics
- Charts
- AI widgets

---

### Legal Case Card

Displays

- Case Title
- Court
- Status
- Progress
- Last Updated

---

### AI Result Card

Displays

- Prediction
- Confidence
- Explainability
- Model Version

---

### Report Card

Displays

- Report Title
- Generation Date
- Download Button

---

# 16.5 Tables

Tables support

- Pagination
- Sorting
- Filtering
- Export
- Search
- Row Selection

Used for

- Cases
- Reports
- Users
- AI Models
- Datasets

---

# 16.6 Navigation

Top Navigation

Contains

- Logo
- Search
- Notifications
- Profile

---

Side Navigation

Contains

- Dashboard
- Cases
- AI Workspace
- Reports
- Analytics
- Settings

---

Breadcrumb Navigation

Example

Dashboard

>

Cases

>

Property Dispute

>

AI Analysis

---

# 16.7 Dialogs

Supported Dialogs

- Confirmation
- Delete
- Upload
- Settings
- AI Processing
- Report Preview

---

# 16.8 Notifications

Types

Success

Warning

Information

Error

Notification Position

Top Right

Auto Close

5 seconds

---

# 16.9 Progress Indicators

Components

- Circular Loader
- Linear Progress
- AI Processing Indicator
- Upload Progress
- Skeleton Loading

---

# 16.10 Badges

Examples

Active

Pending

Closed

AI Generated

Premium

Administrator

---

# 16.11 Tooltips

Displayed on hover.

Used for

- AI explanations
- Icons
- Buttons
- Statistics
- Confidence Scores

---

# 16.12 Pagination

Supports

- Previous
- Next
- Page Numbers
- Page Size Selector

---

# 16.13 Empty States

Illustrations displayed when

- No cases
- No reports
- No notifications
- No search results

Each empty state includes

- Illustration
- Description
- Primary Action Button

---

# End of Part 3
---

# 17. Screen Designs

The WakuLaw platform consists of modern, responsive, and reusable screens designed around the enterprise dashboard paradigm.

Each screen follows the established design system and maintains consistency across desktop, tablet, and mobile devices.

---

# 17.1 Landing Page

## Purpose

Introduce WakuLaw and encourage users to register.

---

## Sections

### Hero Section

Contains

- Logo
- Navigation
- Headline
- Subtitle
- Get Started Button
- Watch Demo Button

---

### Features

Cards

- AI Prediction
- Similar Case Search
- Timeline Intelligence
- Legal Strategy Analysis
- Explainable AI
- AI Chat Assistant

---

### How It Works

Four-step process

1. Upload Case
2. AI Analysis
3. Generate Report
4. Download Results

---

### Testimonials

Professional review cards.

---

### Footer

Contains

- Contact
- Privacy Policy
- Terms
- Social Links

---

# 17.2 Login Screen

Components

- Logo
- Welcome Message
- Email
- Password
- Remember Me
- Forgot Password
- Login Button
- Register Link

Background

Luxury black with subtle gold gradient.

---

# 17.3 Registration Screen

Fields

- Full Name
- Email
- Password
- Confirm Password
- Role Selection
- Terms Acceptance

Button

Create Account

---

# 17.4 Dashboard

Purpose

Provide users with an overview of platform activity.

---

## Widgets

- Total Cases
- Active Cases
- AI Predictions
- Generated Reports
- Recent Activity
- Notifications
- Quick Actions

---

## Charts

- Monthly Cases
- AI Usage
- Report Generation
- Case Categories

---

## Quick Actions

Buttons

- New Case
- Upload Documents
- Run AI Analysis
- Generate Report

---

# 17.5 Cases Screen

Displays

- Search
- Filters
- Case Cards
- Pagination
- Create Case Button

Each card displays

- Case Title
- Court
- Status
- Last Updated
- Progress

---

# 17.6 Case Workspace

Purpose

Central workspace for managing a legal case.

---

## Layout

Left Sidebar

- Documents
- Evidence
- Timeline
- Hearings
- Judgments

Main Content

- Case Information
- AI Summary
- Prediction
- Timeline
- Reports

Right Sidebar

- AI Assistant
- Notifications
- Recent Activity

---

# 17.7 AI Workspace

Purpose

Unified interface for all AI capabilities.

---

## Modules

- Court Prediction
- Similar Cases
- Summarization
- Evidence Analysis
- Timeline Intelligence
- Strategy Analyzer
- Explainable AI

---

Users can execute individual modules or complete workflows.

---

# 17.8 AI Chat

Layout

Left

Conversation History

Center

Chat Messages

Right

Case Context

Features

- Markdown
- Code Blocks
- Attachments
- Suggested Prompts
- Message Search
- Export Conversation

---

# 17.9 Timeline Intelligence

Displays

Interactive chronological timeline.

Supports

- Zoom
- Filters
- Search
- Event Details
- Evidence Links

---

# 17.10 Strategy Dashboard

Sections

Executive Summary

Strengths

Review Areas

Evidence Quality

Timeline Insights

Similar Cases

Confidence Scores

Recommendations for Further Review

---

# 17.11 Reports

Displays

Generated reports.

Supports

- Search
- Preview
- Download
- Export
- Version History

---

# 17.12 Profile

Sections

- Personal Information
- Security
- Notifications
- Preferences
- Activity History

---

# 17.13 Settings

Tabs

- General
- Appearance
- Security
- AI Preferences
- Notifications
- Data Management

---

# End of Part 4
┌────────────────────────────────────────────────────────────────────┐
│ Top Navigation                                                     │
├──────────────┬──────────────────────────────┬──────────────────────┤
│              │                              │                      │
│ Case Tree    │      AI Workspace            │ AI Assistant         │
│ Documents    │                              │ Context Panel        │
│ Evidence     │   Timeline                   │ Notifications        │
│ Hearings     │   Prediction                 │ Memory               │
│ Reports      │   Strategy                   │ Quick Actions        │
│              │                              │                      │
├──────────────┴──────────────────────────────┴──────────────────────┤
│ Bottom Status Bar (AI Status • Model • Processing • Version)       │
└────────────────────────────────────────────────────────────────────┘

---

# 18. AI-Specific Components

The WakuLaw platform includes specialized AI components designed specifically for legal intelligence and analysis.

These components are reusable throughout the application.

---

# 18.1 AI Analysis Card

## Purpose

Displays the result of an AI analysis.

---

## Components

- Module Icon
- Module Name
- Processing Status
- Confidence Score
- Generated Time
- Expand Button

---

## Example

Court Prediction

Confidence: 92%

Status: Completed

Generated: 5 Seconds Ago

---

# 18.2 AI Confidence Meter

Purpose

Visually display AI confidence.

Appearance

Semi-circular gauge

Color Scale

- Green (High)
- Gold (Medium)
- Red (Low)

Displays

- Percentage
- Confidence Level
- AI Model Version

---

# 18.3 Explainability Panel

Displays

- Important Factors
- Confidence Explanation
- Supporting Evidence
- Similar Cases Used
- AI Reasoning Summary

Users can expand each explanation.

---

# 18.4 AI Workflow Builder

Purpose

Allows users to build custom AI workflows.

Layout

Available Modules

↓

Drag & Drop

↓

Execution Order

↓

Run Workflow

Supported Modules

- Prediction
- Summary
- Timeline
- Similar Cases
- Evidence Analysis
- Strategy Analysis
- Courtroom Simulation

---

# 18.5 AI Processing Timeline

Shows

- Request Received
- Preprocessing
- Prediction
- Explainability
- Report Generation
- Completed

Each stage includes

- Status
- Duration
- Timestamp

---

# 18.6 AI Memory Viewer

Displays

- Previous Predictions
- Previous Reports
- Timeline History
- Conversation History
- AI Insights

Users can browse historical AI analyses for the selected case.

---

# 18.7 Timeline Intelligence View

Features

- Vertical Timeline
- Expandable Events
- Event Categories
- Linked Evidence
- Linked Reports
- Search
- Filters

---

# 18.8 Strategy Dashboard Widget

Sections

Executive Summary

Strength Indicators

Review Areas

Evidence Quality

Timeline Insights

Confidence

Generated Reports

---

# 18.9 Similar Cases Viewer

Displays

- Case Title
- Similarity Percentage
- Court
- Decision
- Summary
- Open Details Button

Results sorted by similarity score.

---

# 18.10 Evidence Analysis Widget

Displays

- Uploaded Evidence
- AI Strength Rating
- Missing Evidence
- Supporting Documents
- Confidence

---

# 18.11 Report Preview Panel

Displays

- Report Cover
- Executive Summary
- Report Sections
- Download
- Export
- Print

Supports PDF preview without leaving the application.

---

# 18.12 AI Chat Sidebar

Features

- Conversation History
- Suggested Questions
- Recent Analyses
- Case Context
- Attached Documents
- AI Status

Supports contextual conversations related to the selected legal case.

---

# End of Part 5
---

# 19. Responsive Layout System

The WakuLaw platform follows a responsive-first design approach to ensure a consistent experience across desktop, laptop, tablet, and mobile devices.

---

# 19.1 Grid System

The application uses a 12-column responsive grid.

Desktop

12 Columns

Laptop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

---

# 19.2 Breakpoints

| Device | Width |
|----------|------------|
| Mobile | < 640px |
| Tablet | 640px – 1023px |
| Laptop | 1024px – 1439px |
| Desktop | ≥ 1440px |

---

# 19.3 Container Widths

| Device | Width |
|----------|-----------|
| Mobile | 100% |
| Tablet | 95% |
| Laptop | 90% |
| Desktop | 1440px Max |

---

# 19.4 Desktop Layout

The desktop interface is optimized for professional legal workflows.

Layout Structure

```

┌─────────────────────────────────────────────────────────────┐
│ Top Navigation                                               │
├──────────────┬────────────────────────────┬─────────────────┤
│ Left Sidebar │ Main Workspace             │ Right Sidebar   │
│              │                            │                 │
│ Navigation   │ AI Analysis                │ AI Assistant    │
│ Cases        │ Timeline                   │ Notifications   │
│ Reports      │ Strategy                   │ Recent Activity │
│ Settings     │ Reports                    │ Context Panel   │
│              │                            │                 │
├──────────────┴────────────────────────────┴─────────────────┤
│ Footer Status Bar                                           │
└─────────────────────────────────────────────────────────────┘

```

---

# 19.5 Laptop Layout

Three-column layout remains available with slightly reduced spacing.

Right sidebar collapses automatically when necessary.

---

# 19.6 Tablet Layout

Tablet layout uses two columns.

Layout

```

Navigation Drawer

↓

Main Workspace

↓

Bottom Tabs

```

Right sidebar becomes a slide-out panel.

---

# 19.7 Mobile Layout

Mobile prioritizes simplicity.

Structure

```

Top App Bar

↓

Scrollable Content

↓

Floating Action Button

↓

Bottom Navigation

```

Only one content area is displayed at a time.

---

# 19.8 Responsive Navigation

Desktop

Permanent Sidebar

Laptop

Collapsible Sidebar

Tablet

Drawer Navigation

Mobile

Bottom Navigation Bar

---

# 19.9 Responsive Cards

Cards automatically resize.

Desktop

4 Cards per Row

Laptop

3 Cards per Row

Tablet

2 Cards per Row

Mobile

1 Card per Row

---

# 19.10 Responsive Tables

Large tables automatically transform.

Desktop

Full Table

Tablet

Compact Table

Mobile

Stacked Cards

---

# 19.11 Responsive Charts

Charts automatically adapt.

Desktop

Large Interactive Charts

Tablet

Medium Charts

Mobile

Simplified Charts

---

# 19.12 Responsive AI Workspace

Desktop

Three-panel layout.

Tablet

Two-panel layout.

Mobile

Tabbed interface.

Tabs include

- Analysis
- Timeline
- Reports
- Chat
- Strategy

---

# 20. Accessibility Guidelines

The WakuLaw platform follows accessibility best practices.

---

## Accessibility Features

- Keyboard Navigation
- Screen Reader Support
- High Contrast Mode
- Visible Focus Indicators
- Accessible Forms
- Accessible Tables
- Accessible Charts
- Accessible Buttons

---

## Color Accessibility

Text shall maintain a minimum contrast ratio of 4.5:1.

Important information shall never rely solely on color.

---

## Keyboard Navigation

Every interactive component shall be accessible using:

- Tab
- Shift + Tab
- Enter
- Space
- Escape
- Arrow Keys

---

## Forms

Every form field shall include:

- Label
- Placeholder
- Error Message
- Helper Text

---

# 21. UX Principles

The WakuLaw user experience is guided by the following principles.

## Simplicity

Avoid unnecessary complexity.

---

## Consistency

Maintain a consistent interface across all modules.

---

## Efficiency

Reduce clicks required to complete tasks.

---

## Transparency

Clearly communicate AI confidence, processing status, and limitations.

---

## Feedback

Provide immediate visual feedback for every user action.

---

## Trust

Present AI findings responsibly with explanations and confidence scores.

---

# 22. Future UI Enhancements

Future releases may include:

- Dark/Light Mode
- Custom Themes
- Voice Commands
- Real-Time Collaboration
- Multi-Language Support
- Drag-and-Drop Workflow Builder
- Interactive Case Whiteboard
- AI Copilot Mode
- Offline Workspace
- Progressive Web App (PWA)

---

# End of UI/UX Design System

**Document ID:** WK-DOC-008

**Version:** 1.0

**Status:** Draft**

**Prepared By:** Team WakuLaw

**Reviewed By:** Sir Zahid Sarwar