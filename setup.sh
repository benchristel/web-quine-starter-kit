setup() {
  local project_name="web-quine-$((RANDOM))-$((RANDOM))"

  echo "git-cloning the starter kit into '$project_name'..."
  git clone --quiet --depth=1 https://github.com/benchristel/web-quine-starter-kit.git "$project_name" &&
  cd "$project_name" &&
  rm -rf .git &&
  git init &&
  rm setup.sh
}

setup
