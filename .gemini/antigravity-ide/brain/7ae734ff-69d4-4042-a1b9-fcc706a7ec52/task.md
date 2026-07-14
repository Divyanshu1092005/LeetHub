# Checklist for Revert UI, Silent Formatting, and Inline Highlighting Fix

- `[x]` Remove `editorRef` state from `ProblemPage.jsx`
- `[x]` Remove `handleFormatCode` function from `ProblemPage.jsx`
- `[x]` Simplify `handleEditorDidMount` to only register the C++ document formatting provider silently
- `[x]` Implement inline language mapping for the Monaco Editor `language` prop
- `[x]` Revert action bar in footer to only contain "Run Code" and "Submit Solution"
- `[x]` Update `context.md`
- `[x]` Verify by running production compile test
