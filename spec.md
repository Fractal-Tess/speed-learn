# Speed Learn - Interactive Learning Platform

## Project Overview
A Next.js application that transforms markdown lecture materials into interactive learning modules with built-in questionnaires.

## Architecture & Requirements

### Data Structure
- **Source**: Markdown files located in `/data/` directory
- **Format**: Each `.md` file represents a learning module
- **Content**: Lecture material in standard markdown format
- **Questions**: Embedded within each markdown file using structured format

### Module Page Layout
**Two-column responsive layout:**

#### Left Column - Questionnaire (40% width)
- Interactive quiz with multiple-choice questions
- 4 possible answers per question (minimum)
- Support for multiple correct answers
- Question navigation/pagination
- Progress indicator
- Submit button with score feedback
- Question format embedded in markdown files

#### Right Column - Markdown Content (60% width)
- Rendered markdown content from source files
- Toggle visibility on/off
- Scrollable content area
- Clean, readable typography
- Support for markdown features (headers, lists, code blocks, etc.)

### Technical Specifications

#### Frontend Technologies
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Markdown**: React Markdown or similar library
- **State Management**: React hooks/Context API

#### File Structure
```
/app
  /modules
    /[id]          # Dynamic module pages
    /page.tsx      # Modules listing page
/components
  /module
    ModuleLayout.tsx
    Questionnaire.tsx
    MarkdownRenderer.tsx
    QuestionCard.tsx
/data
  *.md            # Module markdown files
/lib
  markdown.ts     # Markdown parsing utilities
  questions.ts    # Question extraction logic
```

#### Question Format in Markdown
Questions should be embedded in markdown files using a structured format:

```markdown
## Module Content

Regular markdown content here...

---
### Question 1
What is the capital of France?

A. London
B. Paris
C. Berlin
D. Madrid
Correct: B

### Question 2
Which of the following are programming languages? (Select all that apply)

A. HTML
B. JavaScript
C. Python
D. CSS
Correct: B, C
---
```

### Features

#### Module Navigation
- Main modules listing page
- Direct module access via URL (`/modules/1`, `/modules/2`, etc.)
- Previous/Next module navigation
- Breadcrumb navigation

#### Interactive Elements
- Toggle markdown content visibility
- Question validation with immediate feedback
- Score calculation and display
- Progress saving (optional)
- Responsive design for mobile/tablet

#### Question Types
- Single correct answer (radio buttons)
- Multiple correct answers (checkboxes)
- Support for at least 4 options per question

### Implementation Rules

1. **Component Modularity**: Each UI element should be a reusable component
2. **Type Safety**: Use TypeScript throughout the application
3. **Accessibility**: Follow WCAG guidelines for interactive elements
4. **Performance**: Lazy load markdown content, optimize images
5. **Error Handling**: Graceful fallbacks for missing/invalid content
6. **Responsive Design**: Mobile-first approach with breakpoints
7. **State Management**: Local state for quiz progress, global state for module data if needed

### Success Criteria
- [ ] All markdown files render correctly as interactive modules
- [ ] Questionnaire system supports single and multiple correct answers
- [ ] Toggle functionality for markdown content works properly
- [ ] Navigation between modules is smooth and intuitive
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Clean, maintainable code structure
- [ ] Type safety with no TypeScript errors

### Future Enhancements (Optional)
- Progress tracking across modules
- Timer for quizzes
- Export/print functionality
- Dark mode toggle
- Search within modules
- Bookmarking specific content sections