from setuptools import setup

with open("requirements.txt") as f:
    required = f.read().splitlines()

setup(
    name="{{cookiecutter.project_slug}}_core",
    version="0.1.0",
    description="""Data structures for {{cookiecutter.project_slug}}""",
    url="",
    author="Ben Glickenhaus",
    author_email="",
    license="",
    packages=["{{cookiecutter.project_slug}}_core"],
    install_requires=required,
    zip_safe=False,
)
