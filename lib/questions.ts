export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswers: string[];
  multipleCorrect: boolean;
}

export function parseQuestions(content: string): Question[] {
  const questions: Question[] = [];

  // Find questionnaire sections between --- markers
  const questionnaireMatch = content.match(/---([\s\S]*?)---/);

  if (!questionnaireMatch) {
    return questions;
  }

  const questionnaireContent = questionnaireMatch[1];

  // Split into individual questions
  const questionBlocks = questionnaireContent.split(/###\s*Question\s*\d+/i);

  questionBlocks.forEach((block, index) => {
    if (block.trim() === '') return;

    const lines = block.trim().split('\n').filter(line => line.trim());

    if (lines.length < 3) return; // Need at least question, 2 options, and correct answer

    // Extract question (first non-empty line)
    const questionText = lines[0].replace(/^[:#\s]+/, '').trim();

    // Extract options (look for A., B., C., D. pattern)
    const options: string[] = [];
    const correctAnswers: string[] = [];
    let currentOption = '';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if it's an option (A., B., C., D.)
      const optionMatch = line.match(/^([A-D])\.\s*(.+)$/);
      if (optionMatch) {
        if (currentOption) {
          options.push(currentOption);
        }
        currentOption = optionMatch[2];
      }
      // Check if it's the correct answer line
      else if (line.toLowerCase().startsWith('correct:')) {
        if (currentOption) {
          options.push(currentOption);
          currentOption = '';
        }

        const answersText = line.replace(/^correct:\s*/i, '').trim();
        const answerLetters = answersText.split(',').map(a => a.trim().toUpperCase());

        answerLetters.forEach(answer => {
          if (['A', 'B', 'C', 'D'].includes(answer)) {
            correctAnswers.push(answer);
          }
        });
      }
      // Continuation of current option (multi-line option)
      else if (currentOption) {
        currentOption += ' ' + line;
      }
    }

    // Add the last option if exists
    if (currentOption) {
      options.push(currentOption);
    }

    // Only add question if we have valid data
    if (questionText && options.length >= 2 && correctAnswers.length > 0) {
      questions.push({
        id: `q${index + 1}`,
        question: questionText,
        options,
        correctAnswers,
        multipleCorrect: correctAnswers.length > 1
      });
    }
  });

  return questions;
}

// For demo purposes, if no questions are found in markdown, generate some sample questions
export function generateSampleQuestions(): Question[] {
  return [
    {
      id: 'sample1',
      question: 'What is the main difference between FIR and IIR filters?',
      options: [
        'FIR filters have finite impulse response while IIR filters have infinite impulse response',
        'FIR filters are always unstable while IIR filters are always stable',
        'FIR filters use only past outputs while IIR filters use only past inputs',
        'There is no difference between them'
      ],
      correctAnswers: ['A'],
      multipleCorrect: false
    },
    {
      id: 'sample2',
      question: 'Which of the following are advantages of digital filters over analog filters? (Select all that apply)',
      options: [
        'Higher precision and accuracy',
        'Better noise immunity',
        'Flexibility and programmability',
        'Lower cost for complex designs'
      ],
      correctAnswers: ['A', 'B', 'C', 'D'],
      multipleCorrect: true
    },
    {
      id: 'sample3',
      question: 'What is the Nyquist frequency?',
      options: [
        'The highest frequency that can be represented in a digital system',
        'Half the sampling frequency',
        'The frequency at which aliasing occurs',
        'The lowest frequency that can be represented'
      ],
      correctAnswers: ['B'],
      multipleCorrect: false
    },
    {
      id: 'sample4',
      question: 'Which transform is used to convert from time domain to frequency domain in digital signal processing?',
      options: [
        'Laplace Transform',
        'Z-Transform',
        'Fourier Transform',
        'Wavelet Transform'
      ],
      correctAnswers: ['B', 'C'],
      multipleCorrect: true
    }
  ];
}