import os
import random
import re
import sys

DAMPING = 0.85
SAMPLES = 10000


def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: python pagerank.py corpus")
    corpus = crawl(sys.argv[1])
    print(corpus)
    ranks = sample_pagerank(corpus, DAMPING, SAMPLES)
    print(f"PageRank Results from Sampling (n = {SAMPLES})")
    for page in sorted(ranks):
        print(f"  {page}: {ranks[page]:.4f}")
    ranks = iterate_pagerank(corpus, DAMPING)
    print(f"PageRank Results from Iteration")
    for page in sorted(ranks):
        print(f"  {page}: {ranks[page]:.4f}")


def crawl(directory):
    """
    Parse a directory of HTML pages and check for links to other pages.
    Return a dictionary where each key is a page, and values are
    a list of all other pages in the corpus that are linked to by the page.
    """
    pages = dict()

    # Extract all links from HTML files
    for filename in os.listdir(directory):
        if not filename.endswith(".html"):
            continue
        with open(os.path.join(directory, filename)) as f:
            contents = f.read()
            links = re.findall(r"<a\s+(?:[^>]*?)href=\"([^\"]*)\"", contents)
            pages[filename] = set(links) - {filename}

    # Only include links to other pages in the corpus
    for filename in pages:
        pages[filename] = set(
            link for link in pages[filename]
            if link in pages
        )

    return pages


def transition_model(corpus, page, damping_factor):
    """
    Return a probability distribution over which page to visit next,
    given a current page.

    With probability `damping_factor`, choose a link at random
    linked to by `page`. With probability `1 - damping_factor`, choose
    a link at random chosen from all pages in the corpus.
    """
    probabilities = {}

    if corpus[page]:
        p_link = damping_factor / len(corpus[page])
        for link in corpus:
            if link in corpus[page]:
                probabilities[link] = p_link + (1 - damping_factor)/len(corpus)
            else:
                probabilities[link] = (1 - damping_factor)/len(corpus)
    else:
        for link in corpus:
            probabilities[link] = 1 / len(corpus)

    return probabilities



def sample_pagerank(corpus, damping_factor, n):
    """
    Return PageRank values for each page by sampling `n` pages
    according to transition model, starting with a page at random.

    Return a dictionary where keys are page names, and values are
    their estimated PageRank value (a value between 0 and 1). All
    PageRank values should sum to 1.
    """
    pagerank_values = {page:0 for page in list(corpus.keys())}

    page = random.choice(list(corpus.keys()))
    pagerank_values[page] += 1

    for i in range(n-1):
        model = transition_model(corpus, page, damping_factor)
        weighting = [model[probability] for probability in model]
        page = random.choices(list(corpus.keys()), weights=weighting)[0]
        pagerank_values[page] += 1

    for page in pagerank_values:
        pagerank_values[page] = pagerank_values[page]/n

    return pagerank_values


def iterate_pagerank(corpus, damping_factor):
    """
    Return PageRank values for each page by iteratively updating
    PageRank values until convergence.

    Return a dictionary where keys are page names, and values are
    their estimated PageRank value (a value between 0 and 1). All
    PageRank values should sum to 1.
    """
    pagerank_values = {page:(1/len(corpus)) for page in list(corpus.keys())}

    complete = False

    while not complete:
        complete = True
        new_pagerank_values = {page:((1-damping_factor)/len(corpus)) for page in list(corpus.keys())}
        for p in corpus:
            if corpus[p]:
                for i in corpus[p]:
                    new_pagerank_values[i] += damping_factor * (pagerank_values[p] / len(corpus[p]))
            else:
                for i in new_pagerank_values:
                    new_pagerank_values[i] += damping_factor * (pagerank_values[p] / len(corpus))
        for p in pagerank_values:
            if not pagerank_values[p] - 0.001 <= new_pagerank_values[p] <= pagerank_values[p] + 0.001:
                complete = False
        pagerank_values = new_pagerank_values

    return pagerank_values


if __name__ == "__main__":
    main()
