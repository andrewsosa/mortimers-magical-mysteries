<script lang="ts">
  import {
    Button,
    Grid,
    Row,
    Column,
    Slider,
    FormGroup,
    Checkbox,
    Loading,
    Accordion,
    AccordionItem,
    Toolbar,
    ToolbarContent,
    DataTable,
    DataTableSkeleton,
    Link,
  } from "carbon-components-svelte";
  import Launch from "carbon-icons-svelte/lib/Launch.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";

  import { rarityOptions, itemKinds, miscSettings } from "./options";

  import axios from "axios";
  import { onMount } from "svelte";

  const filterSelected = (list): string[][] =>
    list.filter((i) => i.default).map((i) => i.value);

  let selectedRarities = filterSelected(rarityOptions);
  let selectedItemKinds = filterSelected(itemKinds);
  let selectedSettings = filterSelected(miscSettings);

  let sliderValue = 20;
  let isLoading = false;
  let results = [];

  const submitForm = async (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    isLoading = true;
    try {
      let { data } = await axios.post("/api/query", {
        sliderValue,
        selectedItemKinds: selectedItemKinds.flat(),
        selectedRarities,
        selectedSettings,
      });
      console.debug(data);
      results = data.results;
    } catch (err) {
      console.error(err);
    }
    isLoading = false;
  };

  onMount(() => submitForm(null));
</script>

<DataTable
  sortable
  headers={[
    { key: "name", value: "Name" },
    {
      key: "rarity",
      value: "Rarity",
      display: (arr) => arr.join(", "),
    },
    { key: "type", value: "Kind", display: (arr) => arr.join(", ") },
    {
      key: "requires_attunement",
      value: "Requires Attunement",
      display: (att) => (att ? "Yes" : "No"),
    },
    {
      key: "link",
      value: "Link",
    },
  ]}
  rows={results}
>
  <div slot="title">
    <strong>Mortimer's Magical Mysteries</strong>
    <p>5e Magic Item Randomizer</p>
  </div>
  <div slot="description">
    <Accordion>
      <AccordionItem>
        <svelte:fragment slot="title">
          <SettingsAdjust />
          <h7>Customize Item Randomizer</h7>
        </svelte:fragment>
        <Grid>
          <Row>
            <Column>
              <FormGroup legendText="Number of Items">
                <Slider fullWidth={true} bind:value={sliderValue} />
              </FormGroup>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormGroup legendText="Kind">
                {#each itemKinds as { label, value: kind }}
                  <Checkbox
                    bind:group={selectedItemKinds}
                    value={kind}
                    id="rarity-{label}"
                    labelText={label}
                  />
                {/each}
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="Rarity">
                {#each rarityOptions as { value: rarityLevel }}
                  <Checkbox
                    bind:group={selectedRarities}
                    value={rarityLevel}
                    id="rarity-{rarityLevel}"
                    labelText={rarityLevel}
                  />
                {/each}
              </FormGroup>
            </Column>
            <Column>
              <FormGroup legendText="Allow">
                {#each miscSettings as { value: requirement }}
                  <Checkbox
                    bind:group={selectedSettings}
                    value={requirement}
                    id="misc-{requirement}"
                    labelText={requirement}
                  />
                {/each}
              </FormGroup>
            </Column>
          </Row>
        </Grid>
      </AccordionItem>
    </Accordion>
  </div>
  <Toolbar>
    <ToolbarContent>
      <Button type="submit" on:click={submitForm}>
        {#if isLoading}
          <Loading withOverlay={false} small />
        {:else}
          Randomize Magic Items
        {/if}
      </Button>
    </ToolbarContent>
  </Toolbar>
  <svelte:fragment slot="cell" let:row let:cell>
    {#if cell.key === "link"}
      <Link icon={Launch} href={cell.value} target="_blank">D&D Beyond</Link>
    {:else if cell.key === "requires_attunement"}
      {cell.value ? "Yes" : "No"}
    {:else if cell.key === "type" || cell.key === "rarity"}
      {cell.value.join(", ")}
    {:else}
      {cell.value}
    {/if}
  </svelte:fragment>
</DataTable>

<!-- While loading, show some skeleton rows (no header/toolbar) -->
{#if !results.length}
  <DataTableSkeleton showHeader={false} showToolbar={false} rows={20} />
{/if}

<style>
  :global(button[type="submit"]) {
    width: 300px;
    padding: 15px;
  }

  :global(button[type="submit"] div) {
    margin: auto;
  }

  :global(.bx--data-table-container) {
    padding: 0;
  }

  :global(.bx--data-table-header) {
    padding: 1rem 0 0 0;
  }

  :global(.bx--data-table-header__title) {
    padding-left: 1rem;
    padding-bottom: 1.5rem;
  }

  :global(.bx--accordion__content) {
    padding: 6px 16px 0px !important;
  }

  :global(.bx--accordion__title) {
    display: grid;
    grid-template-columns: auto auto 1fr;
    column-gap: 8px;
    align-items: center;
  }

  :global(.bx--skeleton > thead) {
    display: none;
  }

  :global(.bx--grid) {
    padding: 0;
  }
</style>
