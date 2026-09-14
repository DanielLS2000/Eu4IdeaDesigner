import { useIdeaSetContext } from "@/context/IdeaSetContext";

const formatModifierValue = (idea) => {
  if (idea.type === "binary") return "yes";

  const value = Number(idea.bonus_per_level) * Number(idea.level);
  const exportValue = idea.type === "percentage" ? value / 100 : value;
  return Number(exportValue.toFixed(6)).toString();
};

const formatBlock = (name, ideaGroup, findSourceIdea) => {
  const modifiers = ideaGroup
    .map((idea) => {
      const sourceIdea = findSourceIdea(idea);
      if (!sourceIdea) return null;
      return `\t\t${sourceIdea.name} = ${formatModifierValue(idea)}`;
    })
    .filter(Boolean);

  return [`\t${name} = {`, ...modifiers, "\t}"].join("\n");
};

const downloadFile = (content, filename) => {
  const file = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const ExportIdeasButton = () => {
  const { ideaSet, ideas } = useIdeaSetContext();

  const exportIdeas = () => {
    const findSourceIdea = (idea) =>
      ideas.find((sourceIdea) => sourceIdea.name === idea.image || sourceIdea.bonus === idea.name);

    const slotDetails = (slotIndex) => {
      const savedName = localStorage.getItem(`slotName-${slotIndex - 1}`);
      const label = savedName || `Idea ${slotIndex - 1}`;
      const defaultIdeaMatch = label.trim().match(/^idea\s*(\d+)$/i);
      const key = defaultIdeaMatch
        ? `idea${defaultIdeaMatch[1]}`
        : label
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_]+/g, "_")
        .replace(/^_+|_+$/g, "") || `idea${slotIndex - 1}`;

      return { key, label };
    };

    const ideaSlots = ideaSet.slice(2, 9).map((ideaGroup, index) => ({
      ideaGroup,
      ...slotDetails(index + 2),
    }));

    const startModifiers = [ideaSet[0] ?? [], ideaSet[1] ?? []]
      .flat()
      .map((idea) => {
        const sourceIdea = findSourceIdea(idea);
        return sourceIdea ? `\t\t${sourceIdea.name} = ${formatModifierValue(idea)}` : null;
      })
      .filter(Boolean);

    const content = [
      "my_ideas = {",
      "\tstart = {",
      ...startModifiers,
      "\t}",
      "",
      formatBlock("bonus", ideaSet[9] ?? [], findSourceIdea),
      "",
      "\tfree = yes",
      "",
      ...ideaSlots.map(({ key, ideaGroup }) =>
        formatBlock(key, ideaGroup, findSourceIdea)
      ),
      "}",
      "",
    ].join("\n");

    const localization = [
      "\uFEFFl_english:",
      ...ideaSlots.flatMap(({ key, label }) => [
        ` ${key}: "${label.replace(/"/g, '\\"')}"`,
        ` ${key}_desc: ""`,
      ]),
      "",
    ].join("\n");

    downloadFile(content, "my_ideas.txt");
    downloadFile(localization, "my_ideas_l_english.yml");
  };

  return (
    <button
      type="button"
      onClick={exportIdeas}
      className="relative h-[30px] px-3 bg-[#1e2328] border-[1.5px] border-[#5a4225] rounded-sm text-[#d9c49c] font-serif font-bold text-[12px] shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_0_8px_rgba(0,0,0,0.8)] hover:bg-[#2a3138] hover:text-[#f4ecd8] active:brightness-90 transition-all"
    >
      Export Ideas
    </button>
  );
};

export default ExportIdeasButton;
