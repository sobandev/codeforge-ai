import sys
import os

print(f"Python executable: {sys.executable}")
print(f"Python version: {sys.version}")

try:
    import langchain
    print(f"LangChain version: {langchain.__version__}")
    print(f"LangChain file: {langchain.__file__}")
    print(f"LangChain path: {langchain.__path__}")
except ImportError as e:
    print(f"Error importing langchain: {e}")

try:
    import langchain.output_parsers
    print("langchain.output_parsers found")
    print(dir(langchain.output_parsers))
except ImportError as e:
    print(f"Error importing langchain.output_parsers: {e}")

try:
    import langchain_core.output_parsers
    print("langchain_core.output_parsers found")
    print(dir(langchain_core.output_parsers))
except ImportError as e:
    print(f"Error importing langchain_core.output_parsers: {e}")
