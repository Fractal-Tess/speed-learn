'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MarkdownRendererProps {
  content: string;
}

// Component to render text with math expressions
function MathText({ children }: { children: string }) {
  if (!children || typeof children !== 'string') {
    return <>{children}</>;
  }

  const elements = [];
  let currentIndex = 0;

  // Process inline math placeholders
  const inlineMathRegex = /<!--INLINEMATH:([^>]+)-->/g;
  let match;

  while ((match = inlineMathRegex.exec(children)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      elements.push(children.substring(currentIndex, match.index));
    }

    // Add the math expression
    const math = match[1];
    elements.push(
      <InlineMath
        key={`math-${match.index}`}
        math={math}
        errorColor="#ff0000"
      />
    );

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < children.length) {
    elements.push(children.substring(currentIndex));
  }

  return <>{elements}</>;
}

// Helper function to validate if a string is actually a mathematical expression
function isMathematicalExpression(text: string): boolean {
  // Must contain at least one mathematical operator or symbol pattern
  const mathPatterns = [
    /[a-zA-Z_]\([^)]*\)/,          // Function notation like f(x)
    /[a-zA-Z_]\s*=\s*[^=]+/,       // Assignment like y = ...
    /[\+\-\*\/=]/,                   // Basic operators
    /[0-9]+\^[0-9]+/,               // Exponents
    /[\{\}\[\]]/,                    // Brackets
    /\\[a-zA-Z]+/,                   // LaTeX commands
    /_.*?_/,                         // Subscripts
    /\^.*?\^/,                       // Superscripts
    /∑|∫|∏|√|∞|α|β|γ|δ|θ|λ|μ|π|σ|τ|φ|ω|Δ|Φ|Ψ|Ω/  // Math symbols
  ];

  return mathPatterns.some(pattern => pattern.test(text)) && text.length < 200; // Reasonable length check
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Filter out questionnaire sections if they exist
  const filteredContent = content.replace(
    /---[\s\S]*?---/g,
    ''
  );

  // Pre-process content to properly handle math expressions
  const processedContent = filteredContent
    // Handle block math expressions $$...$$
    .replace(/\$\$([^$]+)\$\$/g, (match, math) => {
      // Validate that this looks like actual math content
      if (isMathematicalExpression(math.trim())) {
        return `<!--BLOCKMATH:${math.trim()}-->`;
      }
      return match; // Return unchanged if not valid math
    })
    // Handle inline math expressions $...$ with stricter validation
    .replace(/\$([^\$\n]+)\$/g, (match, math) => {
      // Only treat as math if it contains actual mathematical content
      if (isMathematicalExpression(math.trim())) {
        return `<!--INLINEMATH:${math.trim()}-->`;
      }
      return match; // Return unchanged if not valid math
    });

  return (
    <div className="markdown-content max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
      <div className="prose prose-blue max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
              <MathText>{typeof children === 'string' ? children : ''}</MathText>
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">
              <MathText>{typeof children === 'string' ? children : ''}</MathText>
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium text-gray-700 mb-3 mt-5">
              <MathText>{typeof children === 'string' ? children : ''}</MathText>
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium text-gray-700 mb-2 mt-4">
              <MathText>{typeof children === 'string' ? children : ''}</MathText>
            </h4>
          ),
          p: ({ children }) => {
          const text = typeof children === 'string' ? children : '';

          // Check for block math expressions and render them separately
          if (text.includes('<!--BLOCKMATH:')) {
            const parts = text.split(/<!--BLOCKMATH:([^>]+)-->/g);

            return (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {parts.map((part, index) => {
                  // Even indices are regular text, odd indices are math expressions
                  if (index % 2 === 0) {
                    return <MathText key={`text-${index}`}>{part}</MathText>;
                  } else {
                    return (
                      <div key={`math-${index}`} className="my-4 flex justify-center">
                        <BlockMath
                          math={part.trim()}
                          errorColor="#ff0000"
                        />
                      </div>
                    );
                  }
                })}
              </p>
            );
          }

          return (
            <p className="text-gray-600 mb-4 leading-relaxed">
              <MathText>{text}</MathText>
            </p>
          );
        },
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-600">
              <MathText>{typeof children === 'string' ? children : ''}</MathText>
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
          code: ({ children, className, ...props }: any) => {
            const isInline = !className || !className.includes('language-');
            return isInline ? (
              <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                <MathText>{typeof children === 'string' ? children : ''}</MathText>
              </code>
            ) : (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-gray-300 my-6" />
          ),
        }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>

      <style jsx global>{`
        .markdown-content h1:first-child {
          margin-top: 0;
        }

        .markdown-content .hljs {
          background: #1f2937 !important;
          color: #f3f4f6 !important;
        }

        .markdown-content .hljs-keyword,
        .markdown-content .hljs-selector-tag,
        .markdown-content .hljs-literal,
        .markdown-content .hljs-section,
        .markdown-content .hljs-link {
          color: #60a5fa !important;
        }

        .markdown-content .hljs-string,
        .markdown-content .hljs-title,
        .markdown-content .hljs-name,
        .markdown-content .hljs-type,
        .markdown-content .hljs-attribute,
        .markdown-content .hljs-symbol,
        .markdown-content .hljs-regexp,
        .markdown-content .hljs-link {
          color: #34d399 !important;
        }

        .markdown-content .hljs-number,
        .markdown-content .hljs-built_in,
        .markdown-content .hljs-builtin-name,
        .markdown-content .hljs-literal,
        .markdown-content .hljs-type,
        .markdown-content .hljs-params,
        .markdown-content .hljs-meta,
        .markdown-content .hljs-link {
          color: #fbbf24 !important;
        }
      `}</style>
    </div>
  );
}