"""Helpers to build course .ipynb files with nbformat."""
import nbformat as nbf


def make_notebook(cells, title=None, kernelspec=True):
    nb = nbf.v4.new_notebook()
    nb.cells = cells
    nb.metadata = {
        "kernelspec": {"display_name": "Python 3", "language": "python", "name": "python3"},
        "language_info": {"name": "python"},
    }
    return nb


def md(source):
    return nbf.v4.new_markdown_cell(source.strip())


def code(source):
    return nbf.v4.new_code_cell(source.strip())


def save(nb, path):
    with open(path, "w", encoding="utf-8") as f:
        nbf.write(nb, f)
    print("wrote", path)
