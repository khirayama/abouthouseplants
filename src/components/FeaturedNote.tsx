import * as React from 'react';
import css from 'styled-jsx/css';

import { Resource, NoteResourceData } from '../utils/resource';
import { Link } from '../components/Link';
import { AMPImage } from '../components/AMPImage';

type FeaturedNoteProps = {
  note: Resource<NoteResourceData>;
};

const styles = css`
  .frame {
    display: inline-block;
    position: relative;
    border-radius: 8px;
    text-align: right;
    overflow: hidden;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    width: 100%;
    max-width: 384px;
  }
  .image-wrapper {
    width: 100%;
    height: auto;
  }
  .info {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 12px;
    text-shadow: 0 0 8px #fff;
    z-index: 1;
  }
  .description {
    padding: 8px 0;
    font-size: 1rem;
  }
  .title {
    font-weight: bold;
    font-size: 1.5rem;
  }
`;

export function FeaturedNote(props: FeaturedNoteProps) {
  const note = props.note;

  return (
    <Link to={note.slug}>
      <style jsx>{styles}</style>
      <div className="frame">
        <div className="image-wrapper">
          <AMPImage src="/images/a-close-up-of-a-leaf-on-white-background.jpeg" />
        </div>
        <div className="info">
          <p className="description">{note.data.description}</p>
          <h3 className="title">{note.data.title}</h3>
        </div>
      </div>
    </Link>
  );
}
